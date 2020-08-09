using server.Models.Session;
using server.Models.User;
using System;

namespace server.Data
{
    public interface IUserRepo : IRepo
    {
        // Define Contract between Repo and Controller
        User GetUserByTag(string tag);
        void AddSession(Session session);
        void UpdateSession(Session session);
        Session GetSessionByTag(string tag);
        Session GetSessionByToken(string token);
        User GetUserBySession(string token);
        bool TokenInUse(string token);
        // Important Note: UserHasSession will only give info
        // about whether a User has a row in the sessions table
        bool UserHasSession(string tag);
    }
}
