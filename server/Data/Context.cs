using Microsoft.EntityFrameworkCore;
using server.Models.User;

namespace server.Data
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }

        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //    modelBuilder.Entity<User>()
        //        .HasKey(u => u.Tag);
        //}
    }
}
