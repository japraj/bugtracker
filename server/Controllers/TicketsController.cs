using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using server.Data.AuthorizationHandler;
using server.Data.TicketsData;
using server.Data.UsersData;
using server.Models.TicketModel;
using server.Models.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        public static byte MAX_STATUS_INDEX = 2;
        public static byte MAX_SEVERITY_INDEX = 2;
        public static byte MAX_TYPELABEL_INDEX = 4;
        public static byte MAX_REPRODUCIBILITY_INDEX = 2;


        private readonly ITicketRepo _repository;
        private readonly IMapper _mapper;
        private readonly Authorization auth;

        public TicketsController(ITicketRepo ticketRepo, IMapper mapper, IUserRepo userRepo)
        {
            _repository = ticketRepo;
            _mapper = mapper;
            auth = new Authorization(userRepo, ticketRepo);
        }

        [HttpGet("{id}", Name = "GetTicketById")]
        public ActionResult<Ticket> GetTicketById(int id)
        {
            Ticket? ticket = _repository.GetTicketById(id);
            if (ticket == null)
                return NotFound();
            return Ok(ticket);
        }

        [HttpGet]
        public ActionResult<IEnumerable<TicketCollapsedDTO>> GetCollapsedTickets()
        {
            try
            {
                IEnumerable<TicketCollapsedDTO>? tickets = _repository.GetAllTickets().Select(ticket => _mapper.Map<TicketCollapsedDTO>(ticket));

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
        public ActionResult CreateTicket(TicketCreateDTO newTicket)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            if (newTicket == null)
                return BadRequest();

            string author = auth.GetUserFromCookie(Request).Tag;
            Ticket ticket = _mapper.Map<Ticket>(newTicket, opt => opt.Items["Author"] = author);
            _repository.AddTicket(ticket);
            if (_repository.SaveChanges())
            {
                return CreatedAtRoute(
                    nameof(GetTicketById),
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
             [{ "op": "replace", // operation type
                "path": "/Avatar", // property that is being patched
                "value": "newURL" // new val to be assigned to specified property
              }, ...]
         */

        [HttpPatch("{id}")]
        public ActionResult PatchUser(int id, JsonPatchDocument<TicketUpdateDTO> patchDoc)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();
            // The persistent model is one that is stored in the database
            Ticket? persistentModel = _repository.GetTicketById(id);
            User? requester = auth.GetUserFromCookie(Request);
            if (persistentModel == null || requester == null)
                return NotFound();

            Rank rank = (Rank)requester.Rank;
            bool isAuthor = auth.IsAuthor(persistentModel, requester.Tag);
            ActionResult? returnValue = null;

            // Loop through each of the patches in the patchDoc, validating them and
            // ensuring that the user is authorized to carry them out. Within the
            // anonymous delegate, 'return patch;' is equivalent to using 'continue'
            // and assigning a value to returnValue is equivalent to breaking from the
            // validation loop (because all subsequent delegate calls return immediately).
            patchDoc.Operations.Select(delegate (Operation<TicketUpdateDTO> patch)
            {
                if (returnValue != null)
                    return patch;
                if (patch.OperationType != OperationType.Replace)
                {
                    returnValue = BadRequest();
                    return patch;
                }

                // Local Functions are used to minimize repetition between cases;
                // all cases are distinct because of the generated activity being
                // different. /Assignees and /Imagelinks are unique

                // Used for /Title & /Description
                void EvaluateText(byte propertyIndex)
                {
                    if (!isAuthor)
                        returnValue = Forbid();
                    else if (JsonConvert.SerializeObject(patch.value).Length == 0)
                        returnValue = BadRequest();
                    else
                        // Add Activity
                        Console.WriteLine("Placeholder");
                }

                // Used for /Status, /Severity, /Reproducibility, /TypeLabel
                void EvaluateSelectorProp(byte maxValue, bool requireAuthor, byte propertyIndex)
                {
                    byte value = (byte)patch.value;
                    if (rank < Rank.Developer || (requireAuthor && !isAuthor))
                        returnValue = Forbid();
                    else if (value < 0 || value > maxValue)
                        returnValue = BadRequest();
                    else
                        // Add Activity
                        Console.WriteLine("Placeholder");
                }


                switch (patch.path)
                {
                    case "/Title":
                        EvaluateText(0);
                        break;
                    case "/Description":
                        EvaluateText(0);
                        break;
                    case "/Status":
                        EvaluateSelectorProp(MAX_STATUS_INDEX, false, 0);
                        break;
                    case "/Severity":
                        EvaluateSelectorProp(MAX_SEVERITY_INDEX, false, 0);
                        break;
                    case "/Reproducibility":
                        EvaluateSelectorProp(MAX_REPRODUCIBILITY_INDEX, true, 0);
                        break;
                    case "/TypeLabel":
                        EvaluateSelectorProp(MAX_TYPELABEL_INDEX, true, 0);
                        break;
                    case "/Assignees":
                        if (rank < Rank.Manager)
                            returnValue = Forbid();
                        else
                            // Add Activity
                            Console.WriteLine("Placeholder");
                        break;
                    case "/ImageLinks":
                        if (!isAuthor)
                            returnValue = Forbid();
                        else
                            // Add Activity
                            Console.WriteLine("Placeholder");
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
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTicket(int id)
        {
            if (!auth.IsAuthenticated(Request))
                return Unauthorized();

            Ticket? ticket = _repository.GetTicketById(id);
            if (ticket == null)
                return NotFound();

            if (!auth.IsAuthor(id, Request) && !auth.HasRank(Rank.Developer, Request))
                return Forbid();

            _repository.DeleteTicket(ticket);
            _repository.SaveChanges();

            return NoContent();
        }
    }
}
