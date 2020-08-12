using System;

#nullable enable

namespace server.Models.ActivityModel
{
    public class ActivityReadDTO
    {

        public string Author { get; set; }

        public DateTime CreationDate { get; set; }

        public byte Type { get; set; }

        public int TicketID { get; set; }

        public string New { get; set; }

        public bool Read { get; set; }
    }
}