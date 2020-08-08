﻿using server.Models.Session;
using server.Models.User;
using System.Collections;
using System.Linq;

namespace server.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly Context _context;

        public UserRepo(Context context)
        {
            _context = context;
        }

        public bool SaveChanges() =>
            _context.SaveChanges() >= 0;


        public User GetUserByTag(string tag) =>
            _context.UserSet.FirstOrDefault(u => u.Tag == tag);

        public void AddSession(Session session)
        {
            _context.SessionSet.Add(session);
        }

        public Session GetSessionByToken(string token)
        {
            return _context.SessionSet.FirstOrDefault(s => s.Token == token);
        }

        public Session GetSessionByTag(string Tag) => _context.SessionSet.Find(Tag);

        public User GetUserBySession(string token) =>
            GetUserByTag(GetSessionByToken(token).Tag);

        public void UpdateSession(Session newSession)
        {
            Session session = _context.SessionSet.FirstOrDefault(s => s.Tag == newSession.Tag);
            if (session != null)
                session.Token = newSession.Token;
            _context.SessionSet.Update(session);
        }

        public bool TokenInUse(string token) =>
            _context.SessionSet.FirstOrDefault(session => session.Token == token) != null;

        public bool UserHasSession(string Tag) => _context.SessionSet.Find(Tag) != null;

    }
}
