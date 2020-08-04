#nullable enable

using AutoMapper;
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
        // The mapper flattens our internal representations
        // into their external versions
        private readonly IMapper _mapper;

        public UsersController(IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{tag}")]
        public ActionResult<UserDTO> GetUserByTag(string tag)
        {
            User? user = _repository.GetUserByTag(tag);
            if (user == null)
                return NotFound();
            return Ok(_mapper.Map<UserDTO>(user));
        }
    }
}
