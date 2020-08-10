using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.TicketsData;
using server.Models.TicketModel;

#nullable enable

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketRepo _repository;
        private readonly IMapper _mapper;

        public TicketsController(ITicketRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetTicketById")]
        public ActionResult<Ticket> GetTicketById(int id)
        {
            Ticket? ticket = _repository.GetTicketById(id);
            if (ticket == null)
                return NotFound();
            return Ok(ticket);
        }
    }
}
