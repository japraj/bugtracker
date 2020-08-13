using AutoMapper;
using server.Models.ActivityModel;
using System;

namespace server.Data.TicketsData
{
    public class ActivityProfile : Profile
    {
        public ActivityProfile()
        {
            // Source -> Target
            CreateMap<ActivityCreateDTO, Activity>()
                .ForMember(Activity => Activity.CreationDate,
                            option => option.MapFrom(src => DateTime.UtcNow))
                .ForMember(Activity => Activity.Read,
                            options => options.MapFrom(src => false));
            CreateMap<Activity, ActivityReadDTO>();
        }
    }
}
