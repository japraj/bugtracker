using System.Collections.Generic;

namespace server.Models.UserModel
{
    // External Representation of User
    public class UserReadDTO
    {
        public string Tag { get; set; }
        public string Avatar { get; set; }
        public int Rank { get; set; }
        public List<int> Tickets { get; set; }
        public List<int> Activity { get; set; }
    }
}
