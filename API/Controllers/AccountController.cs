using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly StoreContext _context;
        private readonly IFileService _fileService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService,
                 StoreContext context, IFileService fileService)
        {
            _context = context;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _fileService = fileService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimPrincipleAsync(HttpContext.User);

            // check if user is null first 

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = roles.ToArray()
            };
        }

        [HttpGet("emailexists")]

        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpGet("usernameexists")]

        public async Task<ActionResult<bool>> CheckUserNameExistsAsync([FromQuery] string userName)
        {
            var isExists = await _context.Users.Where(u => u.UserName == userName).FirstOrDefaultAsync() != null;
            return isExists;
        }

        [HttpGet("aboutus")]
        public async Task<ActionResult<KnowAboutUs>> GetAboutUs()
        {
            var user = await _userManager.FindUserByClaimPrincipleWithAboutUsAsync(HttpContext.User);

            return user.KnowAboutUs;
        }

        [HttpGet("knowaboutus")]
        public async Task<ActionResult<List<KnowAboutUs>>> GetKnowAboutUs()
        {
            return await _context.KnowAboutUs.ToListAsync();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var userSigninResult = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!userSigninResult.Succeeded) return Unauthorized(new ApiResponse(401));

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = roles.ToArray()
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAsync([FromForm] RegisterDto registerDto)
        {

            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse() { Errors = new[] { "Email address is in use" } });
            }

            var (imagesList, success) = await _fileService.UploadFiles(registerDto.Files, "");

            if (!success)
            {
                return BadRequest(new ApiResponse(401) { Message = "Failed at uploading images" });
            }

            var attachmentList = new List<Attachment>();
            imagesList.ForEach(i => attachmentList.Add(new Attachment { Path = i }));

            var user = new AppUser
            {
                KnowAboutUsId = !string.IsNullOrEmpty(registerDto.KnowAboutUsId) ? Convert.ToInt32(registerDto.KnowAboutUsId) : -1,
                //KnowAboutUsId = registerDto.KnowAboutUsId,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Occupation = registerDto.Occupation,
                PhoneNumber = registerDto.PhoneNumber,
                OtherPhoneNumber = registerDto.OtherPhoneNumber,
                IsAmerican = registerDto.IsAmerican,
                SSN = registerDto.SSN,
                Attacmhments = attachmentList,
                ResidentAddress = registerDto.ResidentAddress,
                MailingAddress = registerDto.MailingAddress,
                AcceptPolicy = registerDto.AcceptPolicy
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiValidationErrorResponse() { Errors = result.Errors.Select(e => e.Description) });

            if (result.Succeeded)
                await _userManager.AddToRoleAsync(user, "Member");

            return new UserDto
            {
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                Role = new string[] { "Member" }
            };

        }


    }
}