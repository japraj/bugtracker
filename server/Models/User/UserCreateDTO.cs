using System.ComponentModel.DataAnnotations;

namespace server.Models.User
{
    public class UserCreateDTO
    {
        [Required, StringLength(15, MinimumLength = 5, ErrorMessage = "Usernames must be at least 5 characters and cannot exceed 15 characters in length.")]
        public string Tag { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
