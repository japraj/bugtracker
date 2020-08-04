using server.Models.User;

namespace server.Data
{
    public interface IUserRepo
    {
        // Define API Contract for the Users endpoint
        UserDTO GetUserByTag(string tag);
    }
}
