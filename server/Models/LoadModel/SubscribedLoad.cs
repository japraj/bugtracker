using server.Models.ActivityModel;
using server.Models.TicketModel;
using server.Models.UserModel;
using System.Collections.Generic;

namespace server.Models.LoadModel
{
    public class SubscribedLoad
    {
        public IEnumerable<TicketCollapsedDTO> tickets { get; set; }
        public IEnumerable<ActivityReadDTO> activity { get; set; }
        public IEnumerable<UserCollapsedDTO> users { get; set; }
    }
}
