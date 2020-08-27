using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using server.Data.UsersData;
using server.Models.UserModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using server.Models.SessionModel;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using server.Data.AuthorizationHandler;
using Newtonsoft.Json;
using server.Data.ActivityData;
using server.Models.ActivityModel;
using System.Linq;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _repository;
        // Maps our internal data to/from its external representations
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly Authorization auth;
        private readonly ActivityHandler activityHandler;
        private readonly CookieOptions cookieOptions = new CookieOptions
        {
            Path = "/",
            // Secure determines whether the cookie is transmittable
            // over SSL/https only; irrelevant because we do not store any
            // sensitive info in the cookie but still worth configuring.
            // use false for localhost & true for build
            Secure = false,
            // unlike secure, HttpOnly just determines whether the client
            // can access the cookie (true prohibits clientside access)
            HttpOnly = true,
            IsEssential = true,
            SameSite = SameSiteMode.Lax,
        };


        public UsersController(IUserRepo userRepo, IActivityRepo activityRepo,
            IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _repository = userRepo;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            auth = new Authorization(userRepo);
            activityHandler = new ActivityHandler(userRepo, activityRepo, mapper);
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            try
            {
                return Ok(_repository.GetAllUsers().Select(u => _mapper.Map<UserReadDTO>(u)));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{tag}", Name = "ByTag")]
        public async Task<IActionResult> ByTag(string tag)
        {
            User? user = await _userManager.FindByNameAsync(tag);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserReadDTO>(user));
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserCreateDTO user)
        {
            if (user == null)
                return BadRequest();

            // try creating a user; if success, then return a URI
            User mappedUser = _mapper.Map<User>(user);
            IdentityResult result = await _userManager.CreateAsync(mappedUser, user.Password);
            if (result.Succeeded)
            {
                GenerateSession(mappedUser);
                return CreatedAtRoute(nameof(ByTag),
                                      new { user.Tag },
                                      _mapper.Map<UserReadDTO>(mappedUser));
            }
            foreach (var error in result.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }
            return ValidationProblem(ModelState);
        }


        [HttpPost]
        public async Task<IActionResult> Login(UserLoginDTO loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Tag);
            if (user == null)
                return BadRequest();
            Microsoft.AspNetCore.Identity.SignInResult result =
                await _signInManager.CheckPasswordSignInAsync(
                    user, loginRequest.Password, false);
            if (!result.Succeeded)
                return BadRequest();

            ClearClientCookie();

            // Create a new session
            GenerateSession(user);

            return NoContent();
        }

        [NonAction]
        public void GenerateSession(User user)
        {
            Session newSession = new Session
            {
                Token = "",
                Tag = user.Tag,
            };

            do
            {
                newSession.Token = Guid.NewGuid().ToString();
            } while (_repository.TokenInUse(newSession.Token));

            if (_repository.UserHasSession(user.Tag))
                _repository.UpdateSession(newSession);
            else
                _repository.AddSession(newSession);
            _repository.SaveChanges();

            Response.Cookies.Append(Session.KEY, newSession.Token, cookieOptions);
        }

        [HttpGet]
        public ActionResult<UserSessionDTO> LoadSession()
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            User? user = auth.GetUserFromCookie(Request);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserSessionDTO>(user));
        }

        [HttpPost]
        public IActionResult Logout()
        {
            try
            {
                _repository.UpdateSession(new Session
                {
                    Tag = _repository.GetSessionByToken(Request.Cookies[Session.KEY]).Tag,
                    Token = null,
                });
                _repository.SaveChanges();
            }
            catch { }
            ClearClientCookie();
            return NoContent();
        }

        /* The below api endpoint is used as follows:
             - Requires the Patch verb
             - Takes the tag of the user to be updated
             - Has a body of the form (only arrays of length 1 are valid):
                [{ "op": "replace", // operation type
                   "path": "/Avatar", // property that is being patched
                   "value": "newURL" // new val to be assigned to specified property
                 }, ...]
            
            For a full implementation (one which accepts more than 1 operation per
            request), see TicketsController
         */

        [HttpPatch("{tag}")]
        public ActionResult Patch(string tag, JsonPatchDocument<UserUpdateDTO> patchDoc)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            // The persistent model is one that is stored in the database
            User? persistentModel = _repository.GetUserByTag(tag);
            User? requester = auth.GetUserFromCookie(Request);
            if (persistentModel == null || requester == null)
                return NotFound();

            Operation<UserUpdateDTO>? update = patchDoc.Operations.Find(patch => patch.OperationType == OperationType.Replace);
            // only accept a single patch at a time because the client cannot
            // make multiple patches simultaneously, meaning that the request 
            // is not sent by a legit client
            if (patchDoc.Operations.Count > 1 || update == null)
                return BadRequest();

            bool isOwner = string.Equals(tag, requester.Tag,
                        StringComparison.OrdinalIgnoreCase);

            // local Wrapper func for AddActivity which passes all static values
            void AddActivity(ActivityType activity, bool notify) =>
                activityHandler.AddUserActivity(activity,
                    ActivityHandler.Stringify(persistentModel
                                .GetType()
                                .GetProperty(update.path.Substring(1))
                                .GetValue(persistentModel, null)),
                    ActivityHandler.Stringify(update.value),
                    requester, persistentModel, notify);

            // Check that the user is allowed to make the update and that it is valid
            switch (update.path)
            {
                case "/Avatar":
                    if (!isOwner && !auth.HasRank(Rank.Admin, requester))
                        return Forbid();
                    if (JsonConvert.SerializeObject(update.value).Length == 0)
                        return BadRequest();
                    AddActivity(ActivityType.AVATAR, !isOwner);
                    break;
                case "/Rank":
                    try
                    {
                        string value = JsonConvert.SerializeObject(update.value).ToString();
                        Rank newRank = (Rank)short.Parse(value);
                        if (newRank < 0 || (int)newRank > Enum.GetNames(typeof(Rank)).Length - 1)
                            return BadRequest();
                        Rank requiredRank = persistentModel.Rank > (int)Rank.Developer
                        ? Rank.Admin
                        : Rank.Manager;
                        // Forbid if the requester does not have sufficient permissions
                        if (requester.Rank == (int)Rank.User
                             || persistentModel.Rank == (int)Rank.Admin
                             || !auth.HasRank(requiredRank, requester)
                             || !auth.HasRank(newRank, requester))
                            return Forbid();
                    }
                    catch
                    {
                        return BadRequest();
                    }
                    AddActivity(ActivityType.RANK, true);
                    break;
                default:
                    return BadRequest();
            }

            // If we make it this far, we have both sufficient permissions and
            // the model, the requester, and the update request are all non-null
            var updateModel = _mapper.Map<UserUpdateDTO>(persistentModel);
            patchDoc.ApplyTo(updateModel, ModelState);
            _mapper.Map(updateModel, persistentModel);
            _repository.SaveChanges();
            return NoContent();
        }

        public void ClearClientCookie() => Response.Cookies.Delete(Session.KEY);

        // PUT is not used (use PATCH instead) but left for reference

        //[HttpPut("{tag}")]
        //public ActionResult UpdateUser(string tag, UserUpdateDTO user)
        //{
        //    var persistentModel = _repository.GetUserByTag(tag);
        //    if (persistentModel == null)
        //        return NotFound();
        //    _mapper.Map(user, persistentModel);
        //    _repository.SaveChanges();
        //    return NoContent();
        //}
    }
}
