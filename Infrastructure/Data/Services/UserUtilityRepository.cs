using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Services
{
    public class UserUtilityRepository : IUserUtility
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _contextRequest;
        public UserUtilityRepository(UserManager<AppUser> userManager, IHttpContextAccessor contextRequest)
        {
            _userManager = userManager;
            _contextRequest = contextRequest;

        }
        public async Task<string> GetUserID()
        {
            var context = _contextRequest.HttpContext;
            var userId = _userManager.GetUserId(_contextRequest.HttpContext.User);
            ClaimsPrincipal principal = _contextRequest.HttpContext.User as ClaimsPrincipal;
           
            return userId;
        }

        public ClaimsPrincipal GetUser() {

            return _contextRequest?.HttpContext?.User as ClaimsPrincipal;
        }
    
    }
}