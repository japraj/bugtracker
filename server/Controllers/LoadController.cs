﻿using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.ActivityData;
using server.Data.AuthorizationHandler;
using server.Data.TicketsData;
using server.Data.UsersData;
using server.Models.ActivityModel;
using server.Models.LoadModel;
using server.Models.TicketModel;
using server.Models.UserModel;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoadController : ControllerBase
    {
        private readonly ITicketRepo _ticketRepo;
        private readonly IUserRepo _userRepo;
        private readonly IActivityRepo _activityRepo;
        private readonly IMapper _mapper;
        private readonly Authorization auth;

        public LoadController(ITicketRepo ticketRepo, IUserRepo userRepo, IActivityRepo activityRepo, IMapper mapper)
        {
            _ticketRepo = ticketRepo;
            _userRepo = userRepo;
            _activityRepo = activityRepo;
            _mapper = mapper;
            auth = new Authorization(userRepo, ticketRepo);
        }

        [HttpGet]
        public ActionResult<InitialLoad> Initial()
        {
            try
            {
                User? user = auth.GetUserFromCookie(Request);
                IEnumerable<TicketCollapsedDTO>? tickets =
                    _ticketRepo.GetAllTickets()
                               .Select(ticket => _mapper.Map<TicketCollapsedDTO>(ticket));
                IEnumerable<ActivityReadDTO>? activities = _activityRepo.GetAllActivities()
                                                    .Select(activity => _mapper.Map<ActivityReadDTO>(activity));
                IEnumerable<UserReadDTO>? users = _userRepo.GetAllUsers().Select(u => _mapper.Map<UserReadDTO>(u));

                return Ok(new InitialLoad
                {
                    tickets = Normalize(tickets),
                    activity = Normalize(activities),
                    users = Normalize(users),
                    session = user == null ? null : _mapper.Map<UserSessionDTO>(user)
                });
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{filterDate}")]
        public ActionResult<SubscribedLoad> Subscribe(string filterDate)
        {
            try
            {
                DateTime date;
                bool success = DateTime.TryParse(filterDate, out date);
                if (!success) return BadRequest();

                bool IsNew(DateTime toCompare) => toCompare.Date > date.Date;

                IEnumerable<ActivityReadDTO>? activities = _activityRepo.GetAllActivities()
                                                    .Where(a => IsNew(a.CreationDate))
                                                    .Select(activity => _mapper.Map<ActivityReadDTO>(activity));

                IEnumerable<int> updatedTickets = activities == null ? new List<int>() : activities.Select(a => a.TicketID);

                IEnumerable<TicketCollapsedDTO>? tickets =
                    _ticketRepo.GetAllTickets()
                               .Where(t => IsNew(t.UpdateDate) || updatedTickets.Contains(t.Id))
                               .Select(ticket => _mapper.Map<TicketCollapsedDTO>(ticket));

                IEnumerable<UserReadDTO>? users = _userRepo.GetAllUsers()
                                            .Where(u => IsNew(u.CreationDate))
                                            .Select(u => _mapper.Map<UserReadDTO>(u));

                return Ok(new SubscribedLoad
                {
                    tickets = Normalize(tickets),
                    activity = Normalize(activities),
                    users = Normalize(users),
                });
            }
            catch
            {
                return NotFound();
            }
        }

        [NonAction]
        public static IEnumerable<T> Normalize<T>(IEnumerable<T>? list) => list == null ? new List<T>() : list;

    }
}
