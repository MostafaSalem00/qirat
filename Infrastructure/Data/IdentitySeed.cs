using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    // http://www.binaryintellect.net/articles/5e180dfa-4438-45d8-ac78-c7cc11735791.aspx
    public class IdentitySeed
    {
        public static async Task SeedData(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await SeedRoles(roleManager);
            await SeedUsers(userManager);
        }

        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            var userName1 = "Owner";
            var userName2 = "Admin";
            var userName3 = "Member1";
            var userName4 = "Member2";
            var password = "Pa$$w0rd";

            if (await userManager.FindByNameAsync(userName1) == null)
            {
                AppUser user = new AppUser();
                user.UserName = userName1;
                user.Email = "Owner@qirat.com";
                user.NormalizedEmail = "OWNER@QIRAT.COM";
                user.FirstName = "Owner First Name";
                user.LastName = "Owner Last Name";
                user.KnowAboutUsId = 1;
                
                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user,"Owner");
                }
            }


            if (await userManager.FindByNameAsync(userName2) == null)
            {
                AppUser user = new AppUser();
                user.UserName = userName2;
                user.Email = "Admin@qirat.com";
                user.NormalizedEmail = "ADMIN@QIRAT.COM";
                user.FirstName = "Admin First Name";
                user.LastName = "Admin Last Name";
                user.KnowAboutUsId = 1;

                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user,"Admin");
                }
            }

            if (await userManager.FindByNameAsync(userName2) == null)
            {
                AppUser user = new AppUser();
                user.UserName = userName2;
                user.Email = "Admin@qirat.com";
                user.NormalizedEmail = "ADMIN@QIRAT.COM";
                user.FirstName = "Admin First Name";
                user.LastName = "Admin Last Name";
                user.KnowAboutUsId = 1;

                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user,"Admin");
                }
            }

            if (await userManager.FindByNameAsync(userName3) == null)
            {
                AppUser user = new AppUser();
                user.UserName = userName3;
                user.Email = "Member1@qirat.com";
                user.NormalizedEmail = "MEMBER1@QIRAT.COM";
                user.FirstName = "Member1 First Name";
                user.LastName = "Member1 Last Name";
                user.KnowAboutUsId = 1;
                
                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user,"Member");
                }
            }

            if (await userManager.FindByNameAsync(userName4) == null)
            {
                AppUser user = new AppUser();
                user.UserName = userName4;
                user.Email = "Member2@qirat.com";
                user.NormalizedEmail = "MEMBER2@QIRAT.COM";
                user.FirstName = "Member2 First Name";
                user.LastName = "Member2 Last Name";
                user.KnowAboutUsId = 1;
                
                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user,"Member");
                }
            }

        }

        public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            string role1 = "Owner";
            string role2 = "Admin";
            string role3 = "Manager";
            string role4 = "Member";

            if (!roleManager.RoleExistsAsync(role1).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name =role1;
                
                IdentityResult roleResult = await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync(role2).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name =role2;
                
                IdentityResult roleResult = await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync(role3).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name =role3;
                
                IdentityResult roleResult = await roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync(role4).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name =role4;
                
                IdentityResult roleResult = await roleManager.CreateAsync(role);
            }

        }
    }
}