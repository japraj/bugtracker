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
        public static byte MAX_TYPELABEL_INDEX = 4;
        public static byte MAX_REPRODUCIBILITY_INDEX = 2;

        private readonly ITicketRepo _ticketRepo;
        private readonly IUserRepo _userRepo;
        private readonly IActivityRepo _activityRepo;
        private readonly IMapper _mapper;
        private readonly Authorization auth;

        public TicketsController(ITicketRepo ticketRepo, IActivityRepo activityRepo, IMapper mapper, IUserRepo userRepo)
        {
            _ticketRepo = ticketRepo;
            _userRepo = userRepo;
            _activityRepo = activityRepo;
            _mapper = mapper;
            auth = new Authorization(userRepo, ticketRepo);
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
                AddActivity(author.Tag, ActivityType.CREATE, "", "", ticket, author, false);
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
            ActionResult? returnValue = null;

            // Loop through each of the patches in the patchDoc, validating them and
            // ensuring that the user is authorized to carry them out. Within the
            // anonymous delegate, the statement 'return patch' is equivalent to using
            // 'continue' and assigning a value to returnValue is equivalent to breaking
            // from the validation loop (because all subsequent delegate calls will
            // return immediately).
            patchDoc.Operations.Select(delegate (Operation<TicketUpdateDTO> patch)
            {
                if (returnValue != null)
                    return patch;
                if (patch.OperationType != OperationType.Replace)
                {
                    returnValue = BadRequest();
                    return patch;
                }

                // Local Function is used to minimize repetition between cases;
                // ued for /Status, /Severity, /Reproducibility, /TypeLabel
                void EvaluateSelectorProp(byte maxValue, bool requireAuthor)
                {
                    if (rank < Rank.Developer || (requireAuthor && !isAuthor))
                        returnValue = Forbid();
                    else if ((byte)patch.value < 0 || (byte)patch.value > maxValue)
                        returnValue = BadRequest();
                }

                switch (patch.path)
                {
                    case "/Title":
                    case "/Description":
                        if (!isAuthor)
                            returnValue = Forbid();
                        else if (JsonConvert.SerializeObject(patch.value).Length == 0)
                            returnValue = BadRequest();
                        break;
                    case "/Status":
                        EvaluateSelectorProp(MAX_STATUS_INDEX, false);
                        break;
                    case "/Severity":
                        EvaluateSelectorProp(MAX_SEVERITY_INDEX, false);
                        break;
                    case "/Reproducibility":
                        EvaluateSelectorProp(MAX_REPRODUCIBILITY_INDEX, true);
                        break;
                    case "/TypeLabel":
                        EvaluateSelectorProp(MAX_TYPELABEL_INDEX, true);
                        break;
                    case "/Assignees":
                        if (rank < Rank.Manager)
                            returnValue = Forbid();
                        break;
                    case "/ImageLinks":
                        if (!isAuthor)
                            returnValue = Forbid();
                        break;
                    default:
                        returnValue = BadRequest();
                        break;
                }
                return patch;
            });

            if (returnValue != null)
                return returnValue;

            TicketUpdateDTO updateModel = _mapper.Map<TicketUpdateDTO>(persistentModel);
            patchDoc.ApplyTo(updateModel, ModelState);
            if (!TryValidateModel(updateModel))
                return ValidationProblem(ModelState);
            _mapper.Map(updateModel, persistentModel);
            _ticketRepo.SaveChanges();

            // Generate activities for each update of the patchdoc. No validation required
            // because everything has gone smoothly up til this point
            byte index = 0;
            patchDoc.Operations.Select(delegate (Operation<TicketUpdateDTO> patch)
            {
                index++;
                // local Wrapper func for AddActivity which passes all static values
                void AddActivity(ActivityType activity) =>
                    this.AddActivity(requester.Tag, activity,
                        persistentModel
                            .GetType()
                            .GetProperty(patch.path.Substring(1))
                            .GetValue(persistentModel, null)
                            .ToString(),
                        JsonConvert.SerializeObject(patch.value),
                        persistentModel, author, index == (byte)0);

                switch (patch.path)
                {
                    case "/Title":
                        AddActivity(ActivityType.TITLE);
                        break;
                    case "/Description":
                        AddActivity(ActivityType.DESCRIPTION);
                        break;
                    case "/Status":
                        AddActivity(ActivityType.STATUS);
                        break;
                    case "/Severity":
                        AddActivity(ActivityType.SEVERITY);
                        break;
                    case "/Reproducibility":
                        AddActivity(ActivityType.REPRODUCIBILITY);
                        break;
                    case "/TypeLabel":
                        AddActivity(ActivityType.TYPELABEL);
                        break;
                    case "/Assignees":
                        AddActivity(ActivityType.ASSIGNEES);
                        break;
                    case "/ImageLinks":
                        AddActivity(ActivityType.LINKS);
                        break;
                }
                return patch;
            });
            return NoContent();
        }

        [HttpPatch]
        public ActionResult<Activity> AddComment(TicketCommentDTO comment)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();

            User? requester = auth.GetUserFromCookie(Request);
            if (requester == null)
                return NotFound();

            ActionResult? result = GenerateActivity(requester, ActivityType.COMMENT, "", comment.Message, (byte)comment.TicketID, true);
            if (result != null)
                return result;
            else
                return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();

            Ticket? ticket = _ticketRepo.GetTicketById(id);
            if (ticket == null)
                return NotFound();

            User requester = auth.GetUserFromCookie(Request);

            if (!auth.IsAuthor(ticket, requester) && !auth.HasRank(Rank.Developer, requester))
                return Forbid();

            ActionResult? result = GenerateActivity(requester, ActivityType.DELETE, "", "", ticket, true);
            if (result != null)
                return result;

            _ticketRepo.DeleteTicket(ticket);
            _ticketRepo.SaveChanges();

            return NoContent();
        }

        // The below methods do NOT handle validation of their parameters

        // Handle creation of an ActivityCreateDTO given all the necessary information and pass it to the below function.
        [NonAction]
        private void AddActivity(string RequesterTag, ActivityType Type, string Old, string New, Ticket ticket, User author, bool notifyAuthor) =>
            AddActivity(new ActivityCreateDTO
            {
                Author = RequesterTag,
                Type = (byte)Type,
                Old = Old,
                New = New,
                TicketID = ticket.Id
            }, ticket, author, notifyAuthor);

        // Add an activity object to the activity set and update the attached ticket's activity list and optionally
        // notify the author of the ticket
        [NonAction]
        private void AddActivity(ActivityCreateDTO activityCreate, Ticket ticket, User author, bool notifyAuthor)
        {
            Activity activity = _mapper.Map<Activity>(activityCreate);
            _activityRepo.AddActivity(activity);
            _activityRepo.SaveChanges();

            if (activityCreate.Type != (int)ActivityType.CREATE)
            {
                if (activityCreate.Type == (int)ActivityType.COMMENT)
                    ticket.Comments++;
                ticket.Activity.Add(activity.Id);
                _ticketRepo.SaveChanges();
            }

            if (notifyAuthor)
            {
                author.Activity.Add(activity.Id);
                _userRepo.SaveChanges();
            }
        }

        // The below methods are wrappers around AddActivity which handle parameter validation/resource loading for us
        [NonAction]
        private ActionResult? GenerateActivity(User Requester, ActivityType Type, string Old, string New, byte TicketID, bool notifyAuthor)
        {
            Ticket? ticket = _ticketRepo.GetTicketById(TicketID);
            if (ticket == null)
                return NotFound();

            return GenerateActivity(Requester, Type, Old, New, ticket, notifyAuthor);
        }

        [NonAction]
        private ActionResult? GenerateActivity(User Requester, ActivityType Type, string Old, string New, Ticket ticket, bool notifyAuthor)
        {
            User? author = _userRepo.GetUserByTag(ticket.Author);

            if (author == null || Requester == null)
                return NotFound();
            if (New.Length == 0)
                return BadRequest();

            AddActivity(Requester.Tag, Type, Old, New, ticket, author, notifyAuthor);
            return null;
        }
    }
}
