using System.Collections.Generic;

namespace server.Models.TicketModel
{
    public class TicketUpdateDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public byte TypeLabel { get; set; }

        public byte Reproducibility { get; set; }

        public byte Severity { get; set; }

        public byte Status { get; set; }

        public List<string> Assignees { get; set; }

        public List<string> ImageLinks { get; set; }
    }
}
