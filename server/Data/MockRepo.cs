using server.Models.User;

namespace server.Data
{
    public class MockRepo : IUserRepo
    {
        public UserDTO GetUserByTag(string tag) => new UserDTO
        {
            Tag = "Test",
            Avatar = "sfdgsfg",
            Rank = 1,
            Tickets = { },
            Activity = { },
        };

    }
}
