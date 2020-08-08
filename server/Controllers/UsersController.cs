using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using server.Data;
using server.Models.User;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using server.Models.Session;
using System;

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


        public UsersController(IUserRepo repository, IMapper mapper,
            UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("{tag}", Name = "GetUserByTag")]
        public async Task<IActionResult> GetUserByTag(string tag)
        {
            User? user = await _userManager.FindByNameAsync(tag);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserReadDTO>(user));
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserCreateDTO user)
        {
            // guard clause
            if (user == null)
                return BadRequest();

            // try creating a user; if success, then return a URI
            IdentityResult result = await _userManager.CreateAsync(_mapper.Map<User>(user), user.Password);
            if (result.Succeeded)
                return CreatedAtRoute(nameof(GetUserByTag), new { Tag = user.Tag }, _mapper.Map<UserReadDTO>(user));
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

            wipeSession();

            // Create a new session
            string newToken;
            do
            {
                newToken = Guid.NewGuid().ToString();
            } while (_repository.SessionExists(newToken));

            _repository.AddSession(new Session
            {
                Token = newToken,
                Tag = user.Tag,
            });
            _repository.SaveChanges();
            HttpContext.Session.SetString(Session.KEY, newToken);

            return NoContent();
        }

        [HttpPost]
        public IActionResult Logout()
        {
            wipeSession();
            return NoContent();
        }

        [HttpPut("{tag}")]
        public ActionResult UpdateUser(string tag, UserUpdateDTO user)
        {
            var persistentModel = _repository.GetUserByTag(tag);
            if (persistentModel == null)
                return NotFound();
            _mapper.Map(user, persistentModel);
            _repository.SaveChanges();
            return NoContent();
        }

        public void wipeSession()
        {
            string? oldToken = HttpContext.Session.GetString(Session.KEY);
            HttpContext.Session.Remove(Session.KEY);
            if (oldToken != null && _repository.SessionExists(oldToken))
                _repository.ClearSession(oldToken);
        }

        // PATCH is not used (use PUT for simpler auth flow) but left for reference

        /* The below api endpoint is used as follows:
             - Requires the Patch verb
             - Takes the tag of the user to be updated
                [{ "op": "replace", // operation type
                   "path": "/Avatar", // property that is being patched
                   "value": "newURL" // new val to be assigned to specified property
                 }, ...] 
            Note: this endpoint was configured prior to the implementation of
            session keys; it features no authorization.
         */

        //[HttpPatch("{tag}")]
        //public ActionResult PatchUser(string tag, JsonPatchDocument<UserUpdateDTO> patchDoc)
        //{
        //    var persistentModel = _repository.GetUserByTag(tag);
        //    if (persistentModel == null)
        //        return NotFound();
        //    var updateModel = _mapper.Map<UserUpdateDTO>(persistentModel);
        //    patchDoc.ApplyTo(updateModel, ModelState);
        //    if (!TryValidateModel(updateModel))
        //    {
        //        return ValidationProblem(ModelState);
        //    }
        //    _mapper.Map(updateModel, persistentModel);
        //    _repository.SaveChanges();
        //    return NoContent();
        //}
    }
}
