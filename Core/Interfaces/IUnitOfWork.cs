using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IMetalRepository Metals {get; }
        IPlanRepository Plans {get; }
        Task<int> complete();
    }
}