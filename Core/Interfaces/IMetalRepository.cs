using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IMetalRepository
    {
        Task<Metal> GetMetalAsync();

        Task<List<MetalType>> GetMetalAfterShapping();
        Task<Metal> GetMetalByIdAsync(int id);
    }
}