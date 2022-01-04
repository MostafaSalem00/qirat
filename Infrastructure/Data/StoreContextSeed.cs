using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context,  ILoggerFactory loggerFactory)
        {
            try
            {
                if(!context.KnowAboutUs.Any())
                {
                    var aboutUsData = File.ReadAllText("../Infrastructure/Data/SeedData/knowaboutus.json");
                    var aboutUs = JsonSerializer.Deserialize<List<KnowAboutUs>>(aboutUsData);
                    foreach (var item in aboutUs)
                    {
                        await context.KnowAboutUs.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }
                
                if(!context.Rates.Any())
                {
                    var rateData = File.ReadAllText("../Infrastructure/Data/SeedData/rates.json");
                    var rates = JsonSerializer.Deserialize<List<Rates>>(rateData);
                    foreach (var item in rates)
                    {
                        await context.Rates.AddAsync(item);
                    }
                    await context.SaveChangesAsync();

                }
                
                if(!context.Metals.Any())
                {
                    var metalData = File.ReadAllText("../Infrastructure/Data/SeedData/metal.json");
                    var metal = JsonSerializer.Deserialize<Metal>(metalData);
                    
                    await context.Metals.AddAsync(metal);
                    await context.SaveChangesAsync();

                }

                if (!context.ProductBrands.Any())
                {
                    var brandData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandData);
                    foreach (var item in brands)
                    {
                        await context.ProductBrands.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    foreach (var item in types)
                    {
                       await context.ProductTypes.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        await context.Products.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.PlanTypes.Any())
                {
                    var plantypesData = File.ReadAllText("../Infrastructure/Data/SeedData/plantypes.json");
                    var planTypes = JsonSerializer.Deserialize<List<PlanType>>(plantypesData);
                    foreach (var item in planTypes)
                    {
                        await context.PlanTypes.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}