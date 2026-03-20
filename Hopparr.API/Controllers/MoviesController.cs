using Hopparr.API.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hopparr.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController(AppDbContext dbContext) : ControllerBase
    {

        [HttpGet]
        public async Task<IEnumerable<Movie>> GetMovies()
        {
            return await dbContext.Movies.ToListAsync();
        }
    }
}
