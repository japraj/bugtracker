using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models.User
{
    // Internal representation of a User.
    public class User
    {
        // Public Info, accessible by anyone
        [Key, Required, StringLength(15, MinimumLength = 5, ErrorMessage = "Usernames must be at least 5 characters and cannot exceed 15 characters in length.")]
        public string Tag { get; set; }

        [Required, DataType(DataType.ImageUrl)]
        public string Avatar { get; set; }

        [Required]
        public int Rank { get; set; }

        [Required]
        public List<string> Tickets { get; set; }
        // Tickets is a list with references to tickets


        [Required]
        public List<string> Activity { get; set; }

        // Accessible by Client only
        [Required]
        public List<string> Notifications { get; set; }

        public string SessionKey { get; set; }

        // Accessible by Server only
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

    }
}
