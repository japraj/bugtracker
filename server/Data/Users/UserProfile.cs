using AutoMapper;
using server.Models.Session;
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
                            option => option.MapFrom(src => ""))
                .ForMember(user => user.Tickets,
                            option => option.MapFrom(src => new List<string> { }))
                .ForMember(user => user.Activity,
                            option => option.MapFrom(src => new List<string> { }))
                .ForMember(user => user.Notifications,
                            option => option.MapFrom(src => new List<string> { }))
                .ForMember(user => user.UserName, option => option.MapFrom(src => src.Tag));
            CreateMap<UserCreateDTO, UserReadDTO>();
            CreateMap<UserUpdateDTO, User>().ReverseMap();
        }
    }
}
