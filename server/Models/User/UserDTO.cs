using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.User
{
    // External Representation of User
    public class UserDTO
    {
        public string Tag { get; set; }
        public string Avatar { get; set; }
        public int Rank { get; set; }
        public string[] Tickets { get; set; }
        public string[] Activity { get; set; }
    }
}
