using System.Collections.Generic;

namespace server.Models.UserModel
{
    public class UserSessionDTO
    {
        public string Tag { get; set; }

        public string Avatar { get; set; }

       public byte Rank { get; set; }

        public List<int> Tickets { get; set; }

        public List<int> Activity { get; set; }

        public List<int> Notifications { get; set; }

        public List<int> Assigned { get; set; }
    }
}
