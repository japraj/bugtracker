using Microsoft.AspNetCore.Http;
using server.Models.SessionModel;
using server.Data.UsersData;

namespace server.Data.Authorization
{
    public class Authorization
    {
        public static bool HasRank
            (Rank requiredRank, IUserRepo _repository, HttpRequest Request) =>
            _repository.GetUserBySession(Request.Cookies[Session.KEY]).Rank >= (int)requiredRank;

        // Need an 'IsAuthor' function
    }
}
