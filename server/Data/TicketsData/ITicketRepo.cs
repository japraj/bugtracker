using server.Models.TicketModel;
using System.Collections.Generic;

namespace server.Data.TicketsData
{
    public interface ITicketRepo : IRepo
    {
        Ticket GetTicketById(int id);

        void AddTicket(Ticket ticket);

        void UpdateTicket(Ticket newTicket);
    }
}
