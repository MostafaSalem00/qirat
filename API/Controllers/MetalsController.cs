using System.Collections.Generic;
using System.Threading.Tasks;
using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MetalsController : BaseApiController
    {
        // private readonly IMetalRepository _repo;
        private readonly IUnitOfWork _unitOfWork;
        public MetalsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            // _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<Metal>> GetMetal()
        {
            var metal = await _unitOfWork.Metals.GetMetalAsync();
            return Ok(metal);
        }

        [HttpGet("metalshap")]
        public async Task<ActionResult<List<MetalType>>> GetMetalShap()
        {
            var metal = await _unitOfWork.Metals.GetMetalAfterShapping();
            return Ok(metal);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Metal>> GetMetal(int id)
        {
            return await _unitOfWork.Metals.GetMetalByIdAsync(id);

        }



    }
}