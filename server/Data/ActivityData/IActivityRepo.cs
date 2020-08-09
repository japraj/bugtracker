using server.Models.ActivityModel;

namespace server.Data.ActivityData
{
    public interface IActivityRepo : IRepo
    {

        Activity GetActivityById(int id);

        void AddActivity(Activity activity);

        void UpdateActivity(Activity activity);
    }
}
