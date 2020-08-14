using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
