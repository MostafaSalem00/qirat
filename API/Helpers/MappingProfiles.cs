using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<NewPlanDto, Plan>().ReverseMap();
            CreateMap<PlanInfoDto, Plan>().ReverseMap();
            CreateMap<Plan, PlanForSummaryReponseDTO>()
            .ForMember(dest => dest.OrderItem, opt => opt.MapFrom(src => src.OrderItems.FirstOrDefault()));


        }
    }
}