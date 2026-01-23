using System;
using System.Text.RegularExpressions;
namespace Hopparr.CLI;

enum LibraryType
{
  Movie,
  Tv,
  Music
}
enum Problem
{
  MissingTitle,
  MissingYear,
  MissingMetadataProviders,
  InvalidMetadataProviders
}
class MetadataProviders
{
  public string? IMDb { get; set; }
  public string? TMDB { get; set; }
  public string? TVDB { get; set; }
  public string? MusicBrainz { get; set; }
}

interface ILibraryItem
{
  public DirectoryInfo Dir { get; set; }
  public string Title { get; set; }
  public int Year { get; set; }
  public MetadataProviders MetadataProviders { get; set; }
  public HashSet<Problem> Problems { get; set; }
  public void Scan();
}

partial class MovieItem : ILibraryItem
{
  public DirectoryInfo Dir { get; set; }
  public string Title { get; set; } = "";
  public int Year { get; set; }
  public MetadataProviders MetadataProviders { get; set; }
  public HashSet<Problem> Problems { get; set; } = [];

  public MovieItem(DirectoryInfo dir)
  {
    Dir = dir;
    MetadataProviders = new MetadataProviders();
    Match match = MovieRegex().Match(dir.Name);
    if (match.Groups.TryGetValue("title", out var titleGroup))
    {
      Title = titleGroup.Value;
    }
    else
    {
      Problems.Add(Problem.MissingTitle);
    }
    if (match.Groups.TryGetValue("year", out var yearGroup))
    {
      if (int.TryParse(yearGroup.Value.Trim([' ', '(', ')']), out var year))
      {
        Year = year;
      }
      else
      {
        Problems.Add(Problem.MissingYear);
      }
    }
    else
    {
      Problems.Add(Problem.MissingYear);
    }
    if (match.Groups.TryGetValue("mdp", out var mdpGroup))
    {
      foreach (var mdp in mdpGroup.Captures)
      {
        var mdpString = mdp.ToString();
        if (string.IsNullOrWhiteSpace(mdpString))
        {
          Problems.Add(Problem.InvalidMetadataProviders);
          continue;
        }
        var mdpParts = mdpString.ToLower().Trim([' ', '[', ']']).Split('-');
        var provider = mdpParts[0];
        var id = mdpParts[1];
        switch (provider)
        {
          case "imdbid":
            MetadataProviders.IMDb = id;
            break;
          case "tmdbid":
            MetadataProviders.TMDB = id;
            break;
          case "tvdbid":
            MetadataProviders.TVDB = id;
            break;
          case "mubrid":
            MetadataProviders.MusicBrainz = id;
            break;
        }
      }
    }
    else
    {
      Problems.Add(Problem.MissingMetadataProviders);
    }
  }

  public void Scan()
  {
    // TODO
  }

  [GeneratedRegex(@"^(?'title'[a-zA-Z0-9\ \.\!\-\&\,\']+)(?'year'\ \(\d{4}\)){0,1}(?'mdp'\ \[\w+\-\w+\])*$")]
  private static partial Regex MovieRegex();
}

class Library
{
  public LibraryType Type { get; set; }
  public string Path { get; set; }
  public DirectoryInfo Dir;
  public List<ILibraryItem> Items { get; set; } = [];

  public Library(LibraryType type, string path)
  {
    Type = type;
    var libraryDir = new DirectoryInfo(path);
    if (!libraryDir.Exists) throw new DirectoryNotFoundException();
    Path = libraryDir.FullName;
    Dir = libraryDir;
  }

  public void Scan()
  {
    foreach (var dir in Dir.EnumerateDirectories())
    {
      switch (Type)
      {
        case LibraryType.Movie:
          var movieItem = new MovieItem(dir);
          movieItem.Scan();
          Items.Add(movieItem);
          break;
        default:
          throw new NotImplementedException("Library type not implemented yet.");
      }
    }
  }
}
class Program
{
  static void Main(string[] args)
  {
    var version = typeof(Program).Assembly.GetName().Version?.ToString() ?? "Unknown";
    Console.WriteLine($"""
       _  _
      | || |___ _ __ _ __  __ _ _ _ _ _
      | __ / _ \ '_ \ '_ \/ _` | '_| '_|
      |_||_\___/ .__/ .__/\__,_|_| |_|
                |_|  |_|        v{version}
    
    """);

    if (args.Contains("--help") || args.Length < 2)
    {
      Console.WriteLine("""
      Usage: hopparr <library-type> <library-path>
      
      Library Types:
        movie, tv, music

      Example usage:
        hopparr movie /path/to/movie/library
      """);
      return;
    }

    Library library;
    try
    {
      var libraryType = args[0].ToLower() switch
      {
        "movie" => LibraryType.Movie,
        "tv" => LibraryType.Tv,
        "music" => LibraryType.Music,
        _ => throw new ArgumentException("Invalid library type")
      };
      var libraryDir = args[1];
      library = new Library(libraryType, libraryDir);
    }
    catch (DirectoryNotFoundException)
    {
      Console.WriteLine("[Fatal] The specified library path does not exist.");
      return;
    }
    catch (ArgumentException ex)
    {
      Console.WriteLine($"[Fatal] {ex.Message}");
      return;
    }

    Console.WriteLine($"Selected library {library.Path} of type {library.Type}.");

    library.Scan();
    Console.WriteLine($"Scanned {library.Items.Count} items in the library.");

    var o = library.Items[0];
    Console.WriteLine($"""
    {o.Title} ({o.Year})
    Location:
      {o.Dir.FullName}
    Metadata Providers:
      IMDb: {o.MetadataProviders.IMDb}
      TMDB: {o.MetadataProviders.TMDB}
      TVDB: {o.MetadataProviders.TVDB}
      MusicBrainz: {o.MetadataProviders.MusicBrainz}
    Problems:
      {string.Join(", ", o.Problems)}
    """);
  }
}