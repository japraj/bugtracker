using server.Models.TicketModel;
using System.Collections.Generic;

namespace server.Data.TicketsData
{
    public interface ITicketRepo : IRepo
    {
        Ticket GetTicketById(int id);

        void AddTicket(Ticket ticket);

        IEnumerable<Ticket> GetAllTickets();

        void UpdateTicket(Ticket newTicket);

        void DeleteTicket(Ticket ticket);
    }
}
