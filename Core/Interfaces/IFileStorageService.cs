using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IFileStorageService
    {
         Task DeleteFile(string fileRoute, string conatinerName);

         Task<string> SaveFile(string conatinerName, IFormFile files);

         Task<string> EditFile(string containerName, IFormFile file , string fileRoute);
    }
}