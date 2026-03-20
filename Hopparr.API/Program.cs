
using Hopparr.API.Database;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace Hopparr.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseStaticFiles();

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.MapFallbackToFile("index.html");

        app.Run();
    }
}
