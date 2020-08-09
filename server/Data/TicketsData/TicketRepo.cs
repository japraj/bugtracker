using server.Models.TicketModel;

namespace server.Data.TicketsData
{
    public class TicketRepo : ITicketRepo
    {
        private readonly Context _context;

        public TicketRepo(Context context)
        {
            _context = context;
        }

        public bool SaveChanges() =>
            _context.SaveChanges() >= 0;

        public Ticket GetTicketById(int id) =>
            _context.TicketSet.Find(id);

        public void AddTicket(Ticket ticket)
        {
            _context.TicketSet.Add(ticket);
        }

        public void UpdateTicket(Ticket newTicket)
        {
            Ticket ticket = GetTicketById(newTicket.Id);
            if (ticket != null)
            {
                ticket = newTicket;
                _context.TicketSet.Update(ticket);
            }
        }

    }
}
