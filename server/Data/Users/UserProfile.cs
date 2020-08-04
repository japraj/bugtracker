using AutoMapper;
using server.Models.User;

namespace server.Data.Users
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>();
        } 
    }
}
