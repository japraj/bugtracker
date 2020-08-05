using AutoMapper;
using server.Models.User;
using System.Collections.Generic;

namespace server.Data.Users
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Source -> Target
            CreateMap<User, UserReadDTO>();
            CreateMap<UserCreateDTO, User>()
                .ForMember(user => user.Avatar,
                            option => option.MapFrom(o => ""))
                .ForMember(user => user.Tickets,
                            option => option.MapFrom(o => new List<string>{ }))
                .ForMember(user => user.Activity,
                            option => option.MapFrom(o => new List<string> { }))
                .ForMember(user => user.Notifications,
                            option => option.MapFrom(o => new List<string> { }));
            CreateMap<UserUpdateDTO, User>();
            CreateMap<User, UserUpdateDTO>();
        } 
    }
}
