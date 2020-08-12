using AutoMapper;
using server.Models.TicketModel;

namespace server.Data.TicketsData   
{
    public class CreationResolver: IValueResolver<TicketCreateDTO, Ticket, string>
    {
        public string Resolve(TicketCreateDTO source, Ticket destination, string destMember, ResolutionContext context) =>
            context.Options.Items["Author"].ToString();
    }
}
