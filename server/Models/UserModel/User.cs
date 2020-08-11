using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace server.Models.UserModel
{
    // Internal representation of a User.
    public class User : IdentityUser
    {
        // Public Info, accessible by anyone
        [Key, Required, StringLength(15, MinimumLength = 5, ErrorMessage = "Usernames must be at least 5 characters and cannot exceed 15 characters in length.")]
        public string Tag { get; set; }

        [Required, DataType(DataType.ImageUrl)]
        public string Avatar { get; set; }

        [Required]
        public byte Rank { get; set; }

        [Required]
        public List<int> Tickets { get; set; }
        // Tickets is a list with references to tickets

        [Required]
        public List<int> Activity { get; set; }
        // List of activity Ids

        // Accessible by Client only
        [Required]
        public List<int> Notifications { get; set; }
        // List of activity Ids

        // A session key is a 30char string;
        // the first 5-15 characters are equal to
        // the user's tag while the remaining are
        // randomly generated. An skey is always
        // regenerated upon login and used in all
        // protected requests. Skeys are wiped on
        // logout.
        public string SessionKey { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }
    }
}
