using server.Models.User;
using System;
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
            _context.Users.FirstOrDefault(u => u.Tag == tag);

        public void CreateUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));
            _context.Users.Add(user);
        }

        public void UpdateUser(User user)
        {

        }
    }
}
