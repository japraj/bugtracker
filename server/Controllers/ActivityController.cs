using Microsoft.AspNetCore.Mvc;
using server.Data.ActivityData;
using server.Models.ActivityModel;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepo _repository;

        public ActivityController(IActivityRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}", Name = "GetActivityById")]
        public ActionResult<Activity> GetActivityById(int id)
        {
            Activity? activity = _repository.GetActivityById(id);
            if (activity == null)
                return NotFound();
            return Ok(activity);
        }
    }
}
