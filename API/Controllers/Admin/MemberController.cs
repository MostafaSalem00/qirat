using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    public class MemberController : BaseAdminApiController
    {
        private readonly StoreContext _context;
        private readonly UserManager<AppUser> _userManager;
        public MemberController(UserManager<AppUser> userManager, StoreContext context)
        {
            _userManager = userManager;
            _context = context;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetAllMember()
        {
            // var role = _context.Roles.SingleOrDefault(m => m.Name == "Owner" ||  m.Name == "Admin" || m.Name == "Member");

            // var usersInRole = _context.Users.Where(m => m.Roles.Any(r => r.RoleId == role.Id));

            // List<string> usersInRole= _context.UserRoles.Where( a => a.Name == "Owner" ||  a.RoleId == "Admin" || a.RoleId == "Member" ).Select(b => b.UserId).Distinct().ToList();
            var usersOfRole = await _userManager.GetUsersInRoleAsync("Member");
            //var members = await _context.Users.Where( u => usersInRole.Any(ur => ur == u.Id)).Where(u => u.Accepted == false).ToListAsync(); // u => u.Accepted == false

            return Ok(usersOfRole);
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserDto>> GetMemberById(string id)
        {
            var user = await _context.Users.Include(u => u.Attacmhments).Where(u => u.Id == id).FirstOrDefaultAsync();

            var userDto = new AppUserDto
            {
                KnowAboutUsId = user.KnowAboutUsId.ToString(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                UserName = user.UserName,
                Email = user.Email,
                Occupation = user.Occupation,
                PhoneNumber = user.PhoneNumber,
                OtherPhoneNumber = user.OtherPhoneNumber,
                IsAmerican = user.IsAmerican,
                Attachment = user.Attacmhments,
                ResidentAddress = user.ResidentAddress,
                MailingAddress = user.MailingAddress,
                AcceptPolicy = user.AcceptPolicy
            };

            return Ok(userDto);
        }
    }
}