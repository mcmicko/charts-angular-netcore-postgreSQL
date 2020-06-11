
using Backend.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Backend.API
{
  public class Startup
  {
    public string _connectionString = null;
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      _connectionString = Configuration["secretConnectionString"];
      services.AddControllers();
      // services.AddEntityFrameworkNpgsql().AddDbContext<ApiContext>(opt => opt.UseNpgsql(_connectionString));
      services.AddDbContext<ApiContext>(opts =>
      {
        opts.UseNpgsql(_connectionString);
        opts.EnableDetailedErrors();
      });

      services.AddTransient<DataSeed>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataSeed seed)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      seed.SeedData(20, 1000);

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
