using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace LinkedInSignalR
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCookiePolicy();
            app.UseStaticFiles();
            app.UseStatusCodePages();

            //app.UseCors(builder => //CORS SET UP
            //{
            //    builder.WithOrigins("https://www.example.com")
            //            .AllowAnyHeader()
            //            .WithMethods("GET", "POST")
            //            .AllowCredentials();
            //});

            app.UseSignalR(routes => 
            {
                routes.MapHub<ChatHub>("/chathub"); // can be anything in param "/anything"
            });
            app.UseMvcWithDefaultRoute();
        }
    }
}
