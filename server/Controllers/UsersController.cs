using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models.User;
using System.Net;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _repository;
        // Maps our internald data to/from its external representations
        private readonly IMapper _mapper;

        public UsersController(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{tag}", Name = "GetUserByTag")]
        public ActionResult<UserReadDTO> GetUserByTag(string tag)
        {
            #nullable enable
            User? user = _repository.GetUserByTag(tag);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserReadDTO>(user));
        }

        [HttpPost]
        public ActionResult<UserReadDTO> CreateUser(UserCreateDTO user)
        {
            if (user == null)
                return BadRequest();
            var userModel = _mapper.Map<User>(user);
            _repository.CreateUser(userModel);
            if (_repository.SaveChanges())
                return CreatedAtRoute(nameof(GetUserByTag), new { Tag = userModel.Tag }, _mapper.Map<UserReadDTO>(userModel));
            Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            return NoContent();
        }

        /* This api endpoint is used as follows:
             - Requires the Patch verb
             - Takes the tag of the user to be updated
             - (will later take a session key for authorization)
                [{ "op": "replace", // operation type
                   "path": "/Avatar", // property that is being patched
                   "value": "newURL" // new val to be assigned to specified property
                 }, ...] */
        [HttpPatch("{tag}")]
        public ActionResult PatchUser(string tag, JsonPatchDocument<UserUpdateDTO> patchDoc)
        {
            var persistentModel = _repository.GetUserByTag(tag);
            if (persistentModel == null)
                return NotFound();
            var updateModel = _mapper.Map<UserUpdateDTO>(persistentModel);
            patchDoc.ApplyTo(updateModel, ModelState);
            if (!TryValidateModel(updateModel))
            {
                return ValidationProblem(ModelState);
            }
            _mapper.Map(updateModel, persistentModel);
            _repository.UpdateUser(persistentModel);
            _repository.SaveChanges();
            return NoContent();
        }

        // PUT is not used (replaced by PATCH) but left for reference

        //[HttpPut("{tag}")]
        //public ActionResult UpdateUser(string tag, UserUpdateDTO user)
        //{
        //    var persistentModel = _repository.GetUserByTag(tag);
        //    if (persistentModel == null)
        //        return NotFound();
        //    _mapper.Map(user, persistentModel);
        //    _repository.UpdateUser(persistentModel);
        //    _repository.SaveChanges();
        //    return NoContent();
        //}
    }
}
