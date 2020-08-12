using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.ActivityData;
using server.Models.ActivityModel;
using System.Collections.Generic;
using System.Linq;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepo _repository;
        private readonly IMapper _mapper;

        public ActivityController(IActivityRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetActivityById")]
        public ActionResult<Activity> GetActivityById(int id)
        {
            Activity? activity = _repository.GetActivityById(id);
            if (activity == null)
                return NotFound();
            return Ok(activity);
        }

        [HttpGet]
        public ActionResult<IEnumerable<ActivityReadDTO>> GetAll ()
        {
            try
            {
                IEnumerable<ActivityReadDTO>? activities = _repository.GetAllActivities()
                                                    .Select(activity => _mapper.Map<ActivityReadDTO>(activity));
                if (activities.Count() == 0 || activities == null)
                    return NotFound();
                return Ok(activities);
            }
            catch
            {
                return NotFound();
            }
         }

    }
}
