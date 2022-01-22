using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class RegisterDto
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

        public List<IFormFile> Files { get; set; }
        public string ResidentAddress { get; set; }
        public string MailingAddress { get; set; }
        public bool AcceptPolicy { get; set; }

        public string ClientURI { get; set; }
    }
}