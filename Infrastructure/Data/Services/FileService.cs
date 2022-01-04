using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Data.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public FileService(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;

        }
        #region Upload File  
        public void UploadFile(List<IFormFile> files, string subDirectory)
        {
            subDirectory = subDirectory ?? Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var target = Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory);

            Directory.CreateDirectory(target);

            files.ForEach(async file =>
            {
                if (file.Length <= 0) return;
                var filePath = Path.Combine(target, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            });
        }
        #endregion

        public async Task<(List<string> returnPaths, bool finishedAll)> UploadFiles(List<IFormFile> files, string subDirectory)
        {


            subDirectory = !string.IsNullOrEmpty(subDirectory) ? subDirectory : "uploads";
            var target = Path.Combine(_hostingEnvironment.WebRootPath, subDirectory);

            var _returnPaths = new List<string>();
            bool noErrors = true;
            bool iscopied = false;

            if (files.Count <= 0)
                return (new List<string>(), true);

            //Directory.CreateDirectory(target);  
            if (!Directory.Exists(target))
            {
                Directory.CreateDirectory(target);
            }

            try
            {
                // files.ForEach(async file =>
                // {
                //     if (file.Length <= 0) return;
                //     var filePath = Path.Combine(target, file.FileName);
                //         // using (var stream = new FileStream(filePath, FileMode.Create))  
                //         // {  
                //         //     await file.CopyToAsync(stream);  
                //         // }
                //         using (var ms = new MemoryStream())
                //     {
                //         await file.CopyToAsync(ms);
                //         var content = ms.ToArray();
                //         await File.WriteAllBytesAsync(filePath, content);
                //     }

                //     var routeForDB = filePath.Replace("\\", "/");
                //     finished = true;
                //     _returnPaths.Add(routeForDB);
                // });

                foreach (var file in files)
                {
                    // var filePath = Path.Combine(target, file.FileName);
                    // if (file.Length > 0)
                    // {
                    //     using (var stream = new FileStream(filePath, FileMode.Create))
                    //     {
                    //         await file.CopyToAsync(stream);
                    //         var routeForDB = filePath.Replace("\\", "/");
                    //         finished = true;
                    //         _returnPaths.Add(routeForDB);
                    //     }
                    // }
                    string filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(target, filename);
                    //var path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "Upload"));
                    //var path = Path.Combine(target, file.FileName);
                    using (var filestream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(filestream);
                    }
                    iscopied = true;
                    var routeForDB = filePath.Replace("\\", "/");
                    _returnPaths.Add(routeForDB);
                }


            }
            catch (System.Exception)
            {
                noErrors = false;
            }

            return (_returnPaths, (noErrors && iscopied));
        }

        #region Download File  
        public (string fileType, byte[] archiveData, string archiveName) DownloadFiles(string subDirectory)
        {
            var zipName = $"archive-{DateTime.Now.ToString("yyyy_MM_dd-HH_mm_ss")}.zip";

            var files = Directory.GetFiles(Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory)).ToList();

            using (var memoryStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    files.ForEach(file =>
                    {
                        var theFile = archive.CreateEntry(file);
                        using (var streamWriter = new StreamWriter(theFile.Open()))
                        {
                            streamWriter.Write(File.ReadAllText(file));
                        }

                    });
                }

                return ("application/zip", memoryStream.ToArray(), zipName);
            }

        }
        #endregion

        #region Size Converter  
        public string SizeConverter(long bytes)
        {
            var fileSize = new decimal(bytes);
            var kilobyte = new decimal(1024);
            var megabyte = new decimal(1024 * 1024);
            var gigabyte = new decimal(1024 * 1024 * 1024);

            switch (fileSize)
            {
                case var _ when fileSize < kilobyte:
                    return $"Less then 1KB";
                case var _ when fileSize < megabyte:
                    return $"{Math.Round(fileSize / kilobyte, 0, MidpointRounding.AwayFromZero):##,###.##}KB";
                case var _ when fileSize < gigabyte:
                    return $"{Math.Round(fileSize / megabyte, 2, MidpointRounding.AwayFromZero):##,###.##}MB";
                case var _ when fileSize >= gigabyte:
                    return $"{Math.Round(fileSize / gigabyte, 2, MidpointRounding.AwayFromZero):##,###.##}GB";
                default:
                    return "n/a";
            }
        }


        #endregion
    }
}