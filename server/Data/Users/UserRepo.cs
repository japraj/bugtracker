using server.Models.Session;
using server.Models.User;
using System.Linq;

namespace server.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly Context _context;

        public UserRepo(Context context)
        {
            _context = context;
        }

        public bool SaveChanges() =>
            _context.SaveChanges() >= 0;


        public User GetUserByTag(string tag) =>
            _context.UserSet.FirstOrDefault(u => u.Tag == tag);

        public void AddSession(Session session)
        {
            _context.SessionSet.Add(session);
        }

        public Session GetSessionByToken(string token)
        {
            return _context.SessionSet.FirstOrDefault(s => s.Token == token);
        }

        public User GetUserBySession(string token) =>
            GetUserByTag(GetSessionByToken(token).Tag);
        
        public bool SessionExists(string token)
        {
            //try
            //{
            return _context.SessionSet.FirstOrDefault(session => session.Token == token) != null;
            //}
            //catch
            //{
            //    return false;
            //}
        }

        public void ClearSession(string token)
        {
            //try
            //{
            _context.SessionSet.Remove(_context.SessionSet.FirstOrDefault(session => session.Token == token));
            //}
            //catch { }
        }

    }
}
