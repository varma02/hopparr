using Microsoft.EntityFrameworkCore;

namespace Hopparr.API.Database;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<Movie> Movies => Set<Movie>();
}
