using AutoMapper;
using server.Models.UserModel;
using System.Collections.Generic;

namespace server.Data.UsersData
{
    public class SessionResolver : IValueResolver<User, UserSessionDTO, List<int>>
    {
        public List<int> Resolve(User source, UserSessionDTO destination, List<int> destMember, ResolutionContext context) =>
            (List<int>)context.Options.Items["Assigned"];
    }
}
