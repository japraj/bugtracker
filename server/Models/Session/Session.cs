using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.Session
{
    public class Session
    {
        [NotMapped]
        public static readonly string KEY = ".IssueTracker.SessionToken";

        // Values are nullable; null val denotes that the user is logged out.
        [Key]
        public string Tag { get; set; }
        
        public string Token { get; set; }
    }
}
