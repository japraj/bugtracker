using server.Models.ActivityModel;

namespace server.Data.ActivityData
{
    public class ActivityRepo : IActivityRepo
    {
        private readonly Context _context;

        public ActivityRepo(Context context)
        {
            _context = context;
        }

        public bool SaveChanges() =>
            _context.SaveChanges() >= 0;

        public Activity GetActivityById(int id) =>
            _context.ActivitySet.Find(id);

        public void AddActivity(Activity activity)
        {
            _context.ActivitySet.Add(activity);
        }


        public void UpdateActivity(Activity newActivity)
        {
            Activity activity = GetActivityById(newActivity.Id);
            if (activity != null)
            {
                activity = newActivity;
                _context.ActivitySet.Update(activity);
            }
        }
    }
}
