using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.ActivityData;
using server.Data.AuthorizationHandler;
using server.Data.UsersData;
using server.Models.ActivityModel;
using server.Models.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepo _repository;
        private readonly Authorization auth;
        private readonly IMapper _mapper;

        public ActivityController(IActivityRepo repository, IMapper mapper, IUserRepo userRepo)
        {
            _repository = repository;
            _mapper = mapper;
            auth = new Authorization(userRepo);
        }

        [HttpGet("{id}", Name = "GetById")]
        public ActionResult<Activity> GetById(int id)
        {
            Activity? activity = _repository.GetActivityById(id);
            if (activity == null)
                return NotFound();
            return Ok(activity);
        }

        [HttpGet]
        public ActionResult<IEnumerable<ActivityReadDTO>> GetAll()
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

        [HttpPatch]
        public ActionResult ReadAll()
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            try
            {
                IEnumerable<int> ids = auth.GetUserFromCookie(Request)?.Notifications;
                IEnumerable<Activity>? activities = _repository.GetAllActivities().Where(activity => ids.Contains(activity.Id));
                                    
                foreach (Activity activity in activities)
                {
                    if (activity == null)
                        return NotFound();
                    else
                        activity.Read = true;
                }
                if (!_repository.SaveChanges())
                    throw new Exception();
                else
                    return NoContent();
            }
            catch
            {
                return NotFound();
            }
        }

    }
}
