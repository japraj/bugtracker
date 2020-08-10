using Microsoft.AspNetCore.Http;
using server.Models.UserModel;
using server.Models.SessionModel;
using server.Data.UsersData;
using server.Data.TicketsData;

#nullable enable

namespace server.Data.Authorization
{
    public class Authorization
    {
        // User will only be null in the case of a falsified token
        public static User? GetUserFromCookie(IUserRepo _repository, HttpRequest Request) =>
            _repository.GetUserBySession(Request.Cookies[Session.KEY]);

        public static bool HasRank(Rank requiredRank, User? user) =>
            user == null ? false : user.Rank >= (int)requiredRank;

        public static bool HasRank(Rank requiredRank, IUserRepo _repository, HttpRequest Request) =>
            HasRank(requiredRank, GetUserFromCookie(_repository, Request));

        public static bool IsAuthor(int claimId, IUserRepo _userRepo, ITicketRepo _ticketRepo, HttpRequest Request)
        {
            User? user = GetUserFromCookie(_userRepo, Request);
            return user == null ? false : _ticketRepo.GetTicketById(claimId).Author == user.Tag;
        }
    }
}
