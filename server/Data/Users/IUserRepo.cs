using server.Models.User;

namespace server.Data
{
    public interface IUserRepo
    {
        // Define API Contract between Repo and Controller
        User GetUserByTag(string tag);
    }
}
