namespace server.Models.ActivityModel
{
    public class ActivityCreateDTO
    {
        public string Author { get; set; }

        public byte Type { get; set; }

        public int TicketID { get; set; }

        public string Old { get; set; }

        public string New { get; set; }
    }
}