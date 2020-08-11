using Microsoft.AspNetCore.Http;
using server.Models.UserModel;
using server.Models.SessionModel;
using server.Data.UsersData;
using server.Data.TicketsData;
using System;
using server.Models.TicketModel;

#nullable enable

namespace server.Data.AuthorizationHandler
{
    public class Authorization
    {
        private readonly IUserRepo _userRepo;
        private readonly ITicketRepo? _ticketRepo = null;

        public Authorization(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public Authorization(IUserRepo userRepo, ITicketRepo ticketRepo)
        {
            _userRepo = userRepo;
            _ticketRepo = ticketRepo;
        }

        public bool IsAuthenticated(HttpRequest Request) => 
            GetUserFromCookie(Request) != null;

        // User will only be null in the case of a falsified token
        public User? GetUserFromCookie(HttpRequest Request)
        {
            string? token = Request.Cookies[Session.KEY];
            return _userRepo.TokenInUse(token)
                ? _userRepo.GetUserBySession(token)
                : null;
        }

        public bool HasRank(Rank requiredRank, User? user) =>
            user == null ? false : user.Rank >= (int)requiredRank;

        public bool HasRank(Rank requiredRank, HttpRequest Request) =>
            HasRank(requiredRank, GetUserFromCookie(Request));


        // The below overloads are similar to 'curried' functions.
        // The primary reason for decoupling the ticket/user search
        // from the check is because we often end up needing to
        // load the ticket or user anyway and as such, it is wasteful
        // to load again.
        public bool IsAuthor(Ticket ticket, string Tag) =>
            ticket.Author == Tag;

        public bool IsAuthor(Ticket ticket, User? user) =>
            user == null
                ? false
                : IsAuthor(ticket, user.Tag);
        

        public bool IsAuthor(int claimId, HttpRequest Request)
        {
            if (_ticketRepo == null)
                throw new ArgumentNullException();
            Ticket? ticket = _ticketRepo.GetTicketById(claimId);
            return ticket == null ? false : IsAuthor(ticket, GetUserFromCookie(Request));
        }
    }
}
