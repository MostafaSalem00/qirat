//This an Interface
using System.Security.Claims;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUserUtility
    {
        Task<string> GetUserID();

        ClaimsPrincipal GetUser();
    }
}
