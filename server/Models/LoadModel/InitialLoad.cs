using System.Collections.Generic;
using server.Models.ActivityModel;
using server.Models.TicketModel;
using server.Models.UserModel;

#nullable enable

namespace server.Models.LoadModel
{

    public class InitialLoad
    {
        public IEnumerable<TicketCollapsedDTO> tickets  {get; set;} 
        public IEnumerable<ActivityReadDTO> activity { get; set; }
        public IEnumerable<UserCollapsedDTO> users { get; set; }
        public UserSessionDTO? session { get; set; }
    }
}
