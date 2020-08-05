using server.Models.User;

namespace server.Data
{
    public interface IUserRepo
    {
        bool SaveChanges();

        // Define API Contract between Repo and Controller
        User GetUserByTag(string tag);
        void CreateUser(User user);
        void UpdateUser(User user);
    }
}
