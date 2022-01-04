using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Services
{
    public class InAppStorageService : IFileStorageService
    {
        public InAppStorageService(IHttpContextAccessor httpContextAccessor)
        {
            
        }
        public Task DeleteFile(string fileRoute, string conatinerName)
        {
            if(string.IsNullOrEmpty(fileRoute))
            {
                return Task.CompletedTask;
            }

            var fileName = Path.GetFileName(fileRoute);
            var fileDirectory = Path.Combine(conatinerName,fileRoute);

            if(File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }

            return Task.CompletedTask;
        }

        public async Task<string> EditFile(string containerName, IFormFile file, string fileRoute)
        {
            await DeleteFile(fileRoute,containerName);
            return await SaveFile(containerName,file);
        }

        public async Task<string> SaveFile(string conatinerPath, IFormFile file)
        {
            string folder = Path.Combine(conatinerPath);

            if(!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            

            string route = Path.Combine(folder,fileName);
            using(var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var content = ms.ToArray();
                await File.WriteAllBytesAsync(route,content);
            }

            var routeForDB = Path.Combine(conatinerPath,fileName).Replace("\\", "/");
            return routeForDB;
        }
    }
}