using System.Collections.Generic;

namespace server.Models.TicketModel
{
    public class TicketCreateDTO
    {

        public string Author { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public byte TypeLabel { get; set; }

        public byte Reproducibility { get; set; }

        public byte Severity { get; set; }

        public List<string> ImageLinks { get; set; }
    }
}
