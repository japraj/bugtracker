using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models.User;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _repository;

        public UsersController(IUserRepo repository)
        {   
            _repository = repository;
        }

        [HttpGet("{tag}")]
        public ActionResult <UserDTO> GetUserByTag(string tag)
        {
            return Ok(_repository.GetUserByTag(tag));
        }
    }
}
