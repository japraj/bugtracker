using System;

namespace server.Models.User
{
    // Internal representation of a User.
    public class User
    {
        // Public Info, accessible by anyone
        public string Tag { get; set; }
        // All tags are unique
        public string Avatar { get; set; }
        public int Rank { get; set; }
        public string[] Tickets { get; set; }
        // Tickets is an array with references to tickets
        public string[] Activity { get; set; }

        // Accessible by Client only
        public string[] Notifications { get; set; }
        public string[] SessionKey { get; set; }

        // Accessible by Server only
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
