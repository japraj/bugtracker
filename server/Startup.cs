using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using server.Data;
using AutoMapper;
using System;
using server.Models.User;
using server.Models.Session;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.CookiePolicy;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Context>(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("Postgre")
                )
            );

            // commented code registers only the barebones of .Net Core Identity
            //services.AddIdentityCore<User>(options => { });
            //new IdentityBuilder(typeof(User), typeof(IdentityRole), services)
            //    .AddRoleManager<RoleManager<IdentityRole>>()
            //    .AddSignInManager<SignInManager<User>>()
            //    .AddEntityFrameworkStores<Context>();
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<Context>();

            services.AddDistributedMemoryCache();

            services.AddControllers().AddNewtonsoftJson(
                settings =>
                settings.SerializerSettings.ContractResolver
                = new CamelCasePropertyNamesContractResolver()
            );

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IUserRepo, UserRepo>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
