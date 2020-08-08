using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using server.Models.User;
using server.Models.Session;

namespace server.Data
{
    public class Context : IdentityDbContext<User>
    {
        public DbSet<User> UserSet { get; set; }
        public DbSet<Session> SessionSet { get; set; }

        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

    }
}
