using System;

namespace server.Models.TicketModel
{
    public class TicketCollapsedDTO
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public string Title { get; set; }

        public DateTime UpdateDate { get; set; }

        public byte TypeLabel { get; set; }

        public byte Severity { get; set; }

        public byte Status { get; set; }

        public byte Comments { get; set; }
    }
}
