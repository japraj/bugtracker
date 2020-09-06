using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using server.Data.ActivityData;
using server.Data.AuthorizationHandler;
using server.Data.TicketsData;
using server.Data.UsersData;
using server.Models.ActivityModel;
using server.Models.TicketModel;
using server.Models.UserModel;
using System;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        // Define maximum value constraints for patch calls
        public static byte MAX_STATUS_INDEX = 2;
        public static byte MAX_SEVERITY_INDEX = 2;
        public static byte MAX_TYPELABEL_INDEX = 2;
        public static byte MAX_REPRODUCIBILITY_INDEX = 4;

        private readonly ITicketRepo _ticketRepo;
        private readonly IUserRepo _userRepo;
        private readonly IActivityRepo _activityRepo;
        private readonly IMapper _mapper;
        private readonly Authorization auth;
        private readonly ActivityHandler activityHandler;

        public TicketsController(ITicketRepo ticketRepo, IUserRepo userRepo, IActivityRepo activityRepo, IMapper mapper)
        {
            _ticketRepo = ticketRepo;
            _userRepo = userRepo;
            _activityRepo = activityRepo;
            _mapper = mapper;
            auth = new Authorization(userRepo, ticketRepo);
            activityHandler = new ActivityHandler(ticketRepo, userRepo, activityRepo, mapper);
        }

        [HttpGet("{id}", Name = "ById")]
        public ActionResult<Ticket> ById(int id)
        {
            Ticket? ticket = _ticketRepo.GetTicketById(id);
            if (ticket == null)
                return NotFound();
            return Ok(ticket);
        }

        [HttpGet]
        public ActionResult<IEnumerable<TicketCollapsedDTO>> GetCollapsed()
        {
            try
            {
                IEnumerable<TicketCollapsedDTO>? tickets =
                    _ticketRepo.GetAllTickets()
                               .Select(ticket => _mapper.Map<TicketCollapsedDTO>(ticket));
                if (tickets.Count() == 0 || tickets == null)
                    return NotFound();
                return Ok(tickets);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Create(TicketCreateDTO newTicket)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            if (newTicket == null)
                return BadRequest();

            User author = auth.GetUserFromCookie(Request);
            Ticket ticket = _mapper.Map<Ticket>(newTicket, opt => opt.Items["Author"] = author.Tag);

            _ticketRepo.AddTicket(ticket);
            if (_ticketRepo.SaveChanges())
            {
                author.Tickets.Add(ticket.Id);
                _userRepo.SaveChanges();
                activityHandler.AddActivity(ActivityType.CREATE, "", "", author, ticket, author, false, true);
                return CreatedAtRoute(
                    nameof(ById),
                    new { ticket.Id },
                    _mapper.Map<TicketCollapsedDTO>(ticket));
            }
            else
            {
                Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                return NoContent();
            }
        }

        /* patchDoc format: 
             [{ "op": "replace",    // operation type
                "path": "/Avatar",  // property that is being patched
                "value": "newURL"   // new val to be assigned to specified property
              }, ...]
         */

        [HttpPatch("{id}")]
        public ActionResult Patch(int id, JsonPatchDocument<TicketUpdateDTO> patchDoc)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            // The persistent model is one that is stored in the database
            Ticket? persistentModel = _ticketRepo.GetTicketById(id);
            User? requester = auth.GetUserFromCookie(Request);
            User? author = _userRepo.GetUserByTag(persistentModel.Author);
            if (persistentModel == null || requester == null || author == null)
                return NotFound();

            Rank rank = (Rank)requester.Rank;
            bool isAuthor = auth.IsAuthor(persistentModel, requester.Tag);
            ActionResult? result = null;

            // Loop through each of the patches in the patchDoc, validating them and
            // ensuring that the user is authorized to carry them out.
            foreach (Operation<TicketUpdateDTO> patch in patchDoc.Operations)
            {
                if (patch.OperationType != OperationType.Replace)
                    return BadRequest();

                // Local Function is used to minimize repetition between cases;
                // used for /Status, /Severity, /Reproducibility, /TypeLabel
                ActionResult? EvaluateSelectorProp(byte maxValue, bool requireDev)
                {
                    if (rank < Rank.Developer || (requireDev && !auth.HasRank(Rank.Developer, requester)))
                        return Forbid();
                    else if ((long)patch.value < 0 || (long)patch.value > maxValue)
                        return BadRequest();
                    else
                        return null;
                }

                switch (patch.path.ToLower())
                {
                    case "/title":
                    case "/description":
                        if (!isAuthor)
                            return Forbid();
                        else if (JsonConvert.SerializeObject(patch.value).Length == 0)
                            return BadRequest();
                        break;
                    case "/status":
                        result = EvaluateSelectorProp(MAX_STATUS_INDEX, true);
                        break;
                    case "/severity":
                        result = EvaluateSelectorProp(MAX_SEVERITY_INDEX, true);
                        break;
                    case "/reproducibility":
                        result = EvaluateSelectorProp(MAX_REPRODUCIBILITY_INDEX, false);
                        break;
                    case "/typelabel":
                        result = EvaluateSelectorProp(MAX_TYPELABEL_INDEX, false);
                        break;
                    case "/assignees":
                        if (rank < Rank.Manager)
                            return Forbid();
                        break;
                    case "/imagelinks":
                        if (!isAuthor)
                            return Forbid();
                        break;
                    default:
                        return BadRequest();
                }
                if (result != null)
                    return result;
            }

            TicketUpdateDTO updateModel = _mapper.Map<TicketUpdateDTO>(persistentModel);
            patchDoc.ApplyTo(updateModel, ModelState);
            if (!TryValidateModel(updateModel))
                return ValidationProblem(ModelState);

            // Generate activities for each update of the patchdoc. No validation required
            // because everything has gone smoothly up til this point
            byte index = 0;
            foreach (Operation<TicketUpdateDTO> patch in patchDoc.Operations)
            {

                // local Wrapper func for AddActivity which passes all static values
                try
                {
                    void AddActivity(ActivityType activity) =>
                        activityHandler.AddActivity(activity,
                            ActivityHandler.Stringify(
                                persistentModel
                                .GetType()
                                .GetProperties()
                                .Where(p => p.Name.ToLower().Equals(patch.path.Substring(1).ToLower()))
                                .ToList()
                                .First()
                                .GetValue(persistentModel, null)),
                            ActivityHandler.Stringify(patch.value), requester,
                            persistentModel, author, index == 0, false);

                    switch (patch.path.ToLower())
                    {
                        case "/title":
                            AddActivity(ActivityType.TITLE);
                            break;
                        case "/description":
                            AddActivity(ActivityType.DESCRIPTION);
                            break;
                        case "/status":
                            AddActivity(ActivityType.STATUS);
                            break;
                        case "/severity":
                            AddActivity(ActivityType.SEVERITY);
                            break;
                        case "/reproducibility":
                            AddActivity(ActivityType.REPRODUCIBILITY);
                            break;
                        case "/typelabel":
                            AddActivity(ActivityType.TYPELABEL);
                            break;
                        case "/assignees":
                            AddActivity(ActivityType.ASSIGNEES);
                            break;
                        case "/imagelinks":
                            AddActivity(ActivityType.LINKS);
                            break;
                    }
                }
                catch
                {
                    return NotFound();
                }
                index++;
            }

            _mapper.Map(updateModel, persistentModel);
            _ticketRepo.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        public ActionResult<Activity> Comment(TicketCommentDTO comment)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();

            if (comment.Message.Length == 0)
                return BadRequest();

            User? requester = auth.GetUserFromCookie(Request);
            Ticket? ticket = _ticketRepo.GetTicketById(comment.TicketID);
            if (requester == null || ticket == null)
                return NotFound();

            User? author = requester.Tag.Equals(ticket.Author) ? requester : _userRepo.GetUserByTag(ticket.Author);
            if (author == null)
                return NotFound();

            bool success = true;
            Activity activity = _mapper.Map<Activity>(new ActivityCreateDTO
            {
                Author = requester.Tag,
                Type = (byte)ActivityType.COMMENT,
                Old = "",
                New = comment.Message,
                TicketID = (byte)comment.TicketID
            });
            _activityRepo.AddActivity(activity);
            success = _activityRepo.SaveChanges();
            if (!success)
                return NotFound();

            ticket.Comments++;
            ticket.UpdateDate = DateTime.UtcNow;
            ticket.Activity.Add(activity.Id);
            success = _ticketRepo.SaveChanges();
            if (!success)
                return NotFound();

            requester.Activity.Add(activity.Id);
            if (author.Tag != requester.Tag)
                author.Notifications.Add(activity.Id);
            success = _userRepo.SaveChanges();
            if (!success)
                return NotFound();

            return Ok(_mapper.Map<ActivityReadDTO>(activity));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();

            Ticket? ticket = _ticketRepo.GetTicketById(id);
            User? requester = auth.GetUserFromCookie(Request);
            if (ticket == null || requester == null)
                return NotFound();

            if (!auth.IsAuthor(ticket, requester) && !auth.HasRank(Rank.Developer, requester))
                return Forbid();

            if (!activityHandler.GenerateActivity(ActivityType.DELETE, "", "", requester, ticket, true))
                return NotFound();

            _ticketRepo.DeleteTicket(ticket);
            _ticketRepo.SaveChanges();

            return NoContent();
        }
    }
}
