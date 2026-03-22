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
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var movies = await dbContext.Movies.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovieById(int id)
        {
            var movie = await dbContext.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Movie>>> SearchMovies([FromQuery] string title)
        {
            var movies = await dbContext.Movies.Where(m => m.Title.Contains(title)).ToListAsync();
            return Ok(movies);
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
        {
            dbContext.Movies.Add(movie);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);
        }
    }
}
