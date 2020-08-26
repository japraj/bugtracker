using server.Models.ActivityModel;
using server.Models.TicketModel;
using server.Models.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.LoadModel
{
    public class SubscribedLoad
    {
        public IEnumerable<TicketCollapsedDTO> tickets { get; set; }
        public IEnumerable<ActivityReadDTO> activity { get; set; }
        public IEnumerable<UserReadDTO> users { get; set; }
    }
}
