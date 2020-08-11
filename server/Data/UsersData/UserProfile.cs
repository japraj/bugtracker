using AutoMapper;
using server.Models.UserModel;
using System.Collections.Generic;

namespace server.Data.UsersData
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
                            option => option.MapFrom(src => new List<int> { }))
                .ForMember(user => user.Activity,
                            option => option.MapFrom(src => new List<int> { }))
                .ForMember(user => user.Notifications,
                            option => option.MapFrom(src => new List<int> { }))
                .ForMember(user => user.UserName, option => option.MapFrom(src => src.Tag))
                .ForMember(user => user.Rank, option => option.MapFrom(src => 1));
            CreateMap<UserCreateDTO, UserReadDTO>();
            CreateMap<UserUpdateDTO, User>();
            CreateMap<User, UserUpdateDTO>();
        }
    }
}
