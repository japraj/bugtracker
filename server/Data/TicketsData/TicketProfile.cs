using AutoMapper;
using Microsoft.VisualBasic;
using server.Models.TicketModel;
using System;
using System.Collections.Generic;

namespace server.Data.TicketsData
{
    public class TicketProfile : Profile
    {
        public TicketProfile()
        {
            // Source -> Target
            CreateMap<Ticket, TicketCollapsedDTO>();
            CreateMap<TicketCreateDTO, Ticket>()
                .ForMember(ticket => ticket.Author,
                            option => option.MapFrom<CreationResolver>())
                .ForMember(ticket => ticket.CreationDate,
                            option => option.MapFrom(src => DateTime.UtcNow))
                .ForMember(ticket => ticket.UpdateDate,
                            option => option.MapFrom(src => DateTime.UtcNow))
                .ForMember(ticket => ticket.Status,
                            option => option.MapFrom(src => 0))
                .ForMember(ticket => ticket.Assignees,
                            option => option.MapFrom(src => new List<string> { }))
                .ForMember(ticket => ticket.Activity,
                            option => option.MapFrom(src => new List<int> { }))
                .ForMember(ticket => ticket.Comments,
                            option => option.MapFrom(src => 0));
            CreateMap<TicketUpdateDTO, Ticket>().ReverseMap();
        }
    }
}
