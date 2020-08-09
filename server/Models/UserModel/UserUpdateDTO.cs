using System.ComponentModel.DataAnnotations;

namespace server.Models.UserModel
{
    public class UserUpdateDTO
    {
        [Required, DataType(DataType.ImageUrl)]
        public string Avatar { get; set; }
    }
}
