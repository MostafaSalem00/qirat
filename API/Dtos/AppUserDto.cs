using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class AppUserDto
    {

        public string KnowAboutUsId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Occupation { get; set; }
        public string PhoneNumber { get; set; }
        public string OtherPhoneNumber { get; set; }
        public bool IsAmerican { get; set; }
        public string SSN { get; set; }

        // public List<IFormFile> Files { get; set; }
        public string ResidentAddress { get; set; }
        public string MailingAddress { get; set; }
        public bool AcceptPolicy { get; set; }

        public bool PhoneNumberConfirmed { get; set; }
        public string NormalizedUserName { get; set; }

        public string NormalizedEmail { get; set; }

        public DateTimeOffset? LockoutEnd { get; set; }

        public bool LockoutEnabled { get; set; }

        public string Id { get; set; }

        public bool EmailConfirmed { get; set; }

        public string ConcurrencyStamp { get; set; }

        public int AccessFailedCount { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public List<Attachment> Attachment { get; set; }
    }
}