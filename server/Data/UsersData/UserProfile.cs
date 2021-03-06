﻿using AutoMapper;
using server.Models.UserModel;
using System;
using System.Collections.Generic;

namespace server.Data.UsersData
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Source -> Target
            CreateMap<User, UserReadDTO>();
            CreateMap<User, UserCollapsedDTO>();
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
                .ForMember(user => user.Rank, option => option.MapFrom(src => 1))
                .ForMember(user => user.CreationDate, option => option.MapFrom(src => DateTime.UtcNow));
            CreateMap<UserCreateDTO, UserReadDTO>();
            CreateMap<User, UserSessionDTO>()
                .ForMember(user => user.Assigned, 
                            option => option.MapFrom<SessionResolver>());
            CreateMap<UserUpdateDTO, User>();
            CreateMap<User, UserUpdateDTO>();
        }
    }
}
