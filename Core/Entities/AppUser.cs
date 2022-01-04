using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser
    {
        public int KnowAboutUsId { get; set; }
        public KnowAboutUs KnowAboutUs { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Occupation { get; set; }
        public string OtherPhoneNumber { get; set; }
        public bool IsAmerican { get; set; }
        public string SSN { get; set; }
        public List<Attachment> Attacmhments { get; set; }
        public string ResidentAddress { get; set; }

        public string MailingAddress { get; set; }

        public bool AcceptPolicy { get; set; }

        public bool Accepted { get; set; }
    }
}