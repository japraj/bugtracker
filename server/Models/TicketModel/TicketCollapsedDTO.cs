using System;

namespace server.Models.TicketModel
{
    public class TicketCollapsedDTO
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public string Title { get; set; }

        public DateTime UpdateDate { get; set; }

        public short TypeLabel { get; set; }

        public short Severity { get; set; }

        public short Status { get; set; }

        public short Comments { get; set; }
    }
}
