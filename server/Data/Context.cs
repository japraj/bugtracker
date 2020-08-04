using Microsoft.EntityFrameworkCore;
using server.Models.User;

namespace server.Data
{
    public class Context : DbContext
    {
        public Context (DbContextOptions<Context> opt) : base(opt)
        { 
        
        }
    
        public DbSet<User> Users { get; set; }
    }
}
