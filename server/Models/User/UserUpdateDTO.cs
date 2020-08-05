using System.ComponentModel.DataAnnotations;

namespace server.Models.User
{
    public class UserUpdateDTO
    {
        [Required, DataType(DataType.ImageUrl)]
        public string Avatar { get; set; }
    }
}
