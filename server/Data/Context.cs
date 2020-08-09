using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using server.Models.UserModel;
using server.Models.SessionModel;
using server.Models.TicketModel;
using server.Models.ActivityModel;

namespace server.Data
{
    public class Context : IdentityDbContext<User>
    {
        public DbSet<User> UserSet { get; set; }
        public DbSet<Session> SessionSet { get; set; }
        public DbSet<Ticket> TicketSet { get; set; }
        public DbSet<Activity> ActivitySet { get; set; }

        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

    }
}
