using server.Models.ActivityModel;
using System.Collections.Generic;

namespace server.Data.ActivityData
{
    public interface IActivityRepo : IRepo
    {

        Activity GetActivityById(int id);

        void AddActivity(Activity activity);

        IEnumerable<Activity> GetAllActivities();

        void UpdateActivity(Activity activity);
    }
}
