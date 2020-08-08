using server.Models.Session;
using server.Models.User;

namespace server.Data
{
    public interface IUserRepo
    {
        bool SaveChanges();

        // Define Contract between Repo and Controller
        User GetUserByTag(string tag);
        void AddSession(Session session);
        bool SessionExists(string token);
        void ClearSession(string token);
    }
}
