using System.Collections.Generic;

namespace server.Models.TicketModel
{
    public class TicketEditDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public short TypeLabel { get; set; }

        public short Reproducibility { get; set; }

        public short Severity { get; set; }

        public short Status { get; set; }

        public List<string> Assignees { get; set; }

        public List<string> ImageLinks { get; set; }
    }
}
