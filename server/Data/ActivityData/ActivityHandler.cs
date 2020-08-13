using AutoMapper;
using Newtonsoft.Json;
using server.Data.TicketsData;
using server.Data.UsersData;
using server.Models.ActivityModel;
using server.Models.TicketModel;
using server.Models.UserModel;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace server.Data.ActivityData
{
    // Handles generation/management of activity objs
    public class ActivityHandler
    {
        private readonly ITicketRepo? _ticketRepo;
        private readonly IUserRepo _userRepo;
        private readonly IActivityRepo _activityRepo;
        private readonly IMapper _mapper;

        public ActivityHandler(ITicketRepo ticketRepo, IUserRepo userRepo, IActivityRepo activityRepo, IMapper mapper)
        {
            _ticketRepo = ticketRepo;
            _userRepo = userRepo;
            _activityRepo = activityRepo;
            _mapper = mapper;
        }

        public ActivityHandler(IUserRepo userRepo, IActivityRepo activityRepo, IMapper mapper)
        {
            _ticketRepo = null;
            _userRepo = userRepo;
            _activityRepo = activityRepo;
            _mapper = mapper;
        }

        // Convert patchdoc values to string.
        public static string Stringify(object? value)
        {
            if (value is IEnumerable<string> list)
                return string.Join(", ", list);
            else if (value is string s)
                return s;
            else
                return Regex.Replace(JsonConvert.SerializeObject(value), "\\[|\\]|\"", " ").Trim();
        }

        // The below methods do NOT handle validation of their parameters

        // Handle creation of an ActivityCreateDTO given all the necessary information and pass it to the below function.
        public void AddActivity(ActivityType Type, string Old, string New, User requester, Ticket ticket, User ticketAuthor, bool notifyAuthor, bool autoSave) =>
            AddActivity(new ActivityCreateDTO
            {
                Author = requester.Tag,
                Type = (byte)Type,
                Old = Old,
                New = New,
                TicketID = ticket.Id
            }, requester, ticket, ticketAuthor, notifyAuthor, autoSave);

        // Add an activity object to the activity set and update the attached ticket's activity list and optionally
        // notify the author of the ticket
        public void AddActivity(ActivityCreateDTO activityCreate, User requester, Ticket ticket, User ticketAuthor, bool notifyAuthor, bool autoSave)
        {
            if (_ticketRepo == null)
                throw new ArgumentNullException();

            Activity activity = _mapper.Map<Activity>(activityCreate);
            _activityRepo.AddActivity(activity);
            // this save change call cannot be defferred/batched for
            // the purpose of optimizing because if we do not save here,
            // then the ticket/user will not reference the correct id val
            _activityRepo.SaveChanges();

            bool saveTicket = activityCreate.Type != (int)ActivityType.CREATE;

            if (saveTicket)
            {
                if (activityCreate.Type == (int)ActivityType.COMMENT)
                    ticket.Comments++;
                ticket.UpdateDate = DateTime.Now;
                ticket.Activity.Add(activity.Id);
            }

            requester.Activity.Add(activity.Id);
            if (notifyAuthor)
                ticketAuthor.Notifications.Add(activity.Id);
            _userRepo.SaveChanges();

            if (autoSave)
                _ticketRepo.SaveChanges();
        }

        // Id = -1 denotes that it does not link to a ticket.
        public void AddUserActivity(ActivityType Type, string Old, string New, User Requester, User EditedUser, bool notify)
        {
            Activity activity = _mapper.Map<Activity>(new ActivityCreateDTO
            {
                Author = Requester.Tag,
                Type = (byte)Type,
                Old = Old,
                New = New,
                TicketID = -1
            });
            _activityRepo.AddActivity(activity);
            _activityRepo.SaveChanges();

            Requester.Activity.Add(activity.Id);
            if (notify)
                EditedUser.Notifications.Add(activity.Id);
            _userRepo.SaveChanges();
        }

        // The below methods are wrappers around AddActivity which handle parameter validation/resource loading for us
        public bool GenerateActivity(ActivityType Type, string Old, string New, User Requester, byte TicketID, bool notifyAuthor)
        {
            Ticket? ticket = _ticketRepo.GetTicketById(TicketID);
            if (ticket == null)
                return false;

            return GenerateActivity(Type, Old, New, Requester, ticket, notifyAuthor);
        }

        public bool GenerateActivity(ActivityType Type, string Old, string New, User Requester, Ticket ticket, bool notifyAuthor)
        {
            User? author = _userRepo.GetUserByTag(ticket.Author);

            if (author == null || Requester == null)
                return false;

            // Autosave is enabled by default
            AddActivity(Type, Old, New, Requester, ticket, author, notifyAuthor, true);
            return true;
        }

    }
}
