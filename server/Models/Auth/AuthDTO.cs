using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Auth
{
    // This is different from the UserInfoDTO in that it 
    // is used for client authentication while UserInfoDTO
    // is used to access other Users' profiles. This object
    // does not contain Activity because that is accessed
    // via the UserInfoDTO only when necessary.
    public class AuthDTO
    {        
        public string Tag { get; set; }
        public string Avatar { get; set; }
        public int Rank { get; set; }
        public string[] Notifications { get; set; }
        public string[] SessionKey { get; set; }
    }
}
