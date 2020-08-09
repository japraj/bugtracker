using System.ComponentModel.DataAnnotations;

namespace server.Models.UserModel
{
    public class UserLoginDTO
    {
        [Required, StringLength(15, MinimumLength = 5, ErrorMessage = "Usernames must be at least 5 characters and cannot exceed 15 characters in length.")]
        public string Tag { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
