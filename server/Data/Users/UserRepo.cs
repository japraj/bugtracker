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

        public User GetUserByTag(string tag) => 
            _context.Users.FirstOrDefault(u => u.Tag == tag);

    }
}
