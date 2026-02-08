using System;
using System.Text.RegularExpressions;
namespace Hopparr.CLI;


enum LibraryProblem
{
  MissingTitle,
  MissingYear,
  MissingMetadataProviders,
  InvalidMetadataProviders
}

enum MediaProblem
{
  MissingAudio,
  MissingVideo,
  Corrupted
}

class MetadataProviders
{
  public string? IMDb { get; set; }
  public string? TMDB { get; set; }
  public string? TVDB { get; set; }
}

interface IMediaFile
{
  public FileInfo File { get; set; }
  public double Duration { get; set; }
  public HashSet<MediaProblem> Problems { get; set; }
  public void Scan();
}

interface IVideoFile : IMediaFile
{
  public int Width { get; set; }
  public int Height { get; set; }
  public HashSet<string> AudioLanguages { get; set; }
  public bool IsHDR { get; set; }
  public bool Is3D { get; set; }
}

class MovieFile(FileInfo file) : IVideoFile
{
  public FileInfo File { get; set; } = file;
  public double Duration { get; set; }
  public HashSet<MediaProblem> Problems { get; set; } = [];
  public int Width { get; set; }
  public int Height { get; set; }
  public HashSet<string> AudioLanguages { get; set; } = [];
  public bool IsHDR { get; set; }
  public bool Is3D { get; set; }
  public void Scan()
  {
    // TODO
  }
}

interface ILibraryItem
{
  public DirectoryInfo Dir { get; set; }
  public string Title { get; set; }
  public int Year { get; set; }
  public MetadataProviders MetadataProviders { get; set; }
  public HashSet<LibraryProblem> Problems { get; set; }
  public List<IMediaFile> MediaFiles { get; set; }
  public void Scan();
}

partial class MovieItem : ILibraryItem
{
  private static readonly HashSet<string> MediaExtensions = ["mkv", "mp4", "avi", "mov", "wmv", "flv", "mpeg", "mpg", "m4v"];
  public DirectoryInfo Dir { get; set; }
  public string Title { get; set; } = "";
  public int Year { get; set; }
  public MetadataProviders MetadataProviders { get; set; }
  public HashSet<LibraryProblem> Problems { get; set; } = [];

  public List<MovieFile> MediaFiles { get; set; } = [];

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
      Problems.Add(LibraryProblem.MissingTitle);
    }
    if (match.Groups.TryGetValue("year", out var yearGroup))
    {
      if (int.TryParse(yearGroup.Value.Trim([' ', '(', ')']), out var year))
      {
        Year = year;
      }
      else
      {
        Problems.Add(LibraryProblem.MissingYear);
      }
    }
    else
    {
      Problems.Add(LibraryProblem.MissingYear);
    }
    if (match.Groups.TryGetValue("mdp", out var mdpGroup))
    {
      if (mdpGroup.Captures.Count > 0)
      {
        foreach (var mdp in mdpGroup.Captures)
        {
          var mdpString = mdp.ToString();
          if (string.IsNullOrWhiteSpace(mdpString))
          {
            Problems.Add(LibraryProblem.InvalidMetadataProviders);
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
            default:
              Problems.Add(LibraryProblem.InvalidMetadataProviders);
              break;
          }
        }
      }
      else
      {
        Problems.Add(LibraryProblem.MissingMetadataProviders);
      }
    }
    else
    {
      Problems.Add(LibraryProblem.MissingMetadataProviders);
    }
  }

  public void Scan()
  {
    MediaFiles = [];
    foreach (var file in Dir.EnumerateFiles())
    {
      if (MediaExtensions.Contains(file.Extension.TrimStart('.').ToLower()))
      {
        // MediaFiles.Add(file);
      }
    }
  }

  [GeneratedRegex(@"^(?'title'[a-zA-Z0-9\ \.\!\-\&\,\']+)(?'year'\ \(\d{4}\)){0,1}(?'mdp'\ \[\w+\-\w+\])*$")]
  private static partial Regex MovieRegex();
}

abstract class Library<T> where T : ILibraryItem
{
  public string Path { get; set; }
  public DirectoryInfo Dir;
  public List<T> Items { get; set; } = [];

  public Library(string path)
  {
    var libraryDir = new DirectoryInfo(path);
    if (!libraryDir.Exists) throw new DirectoryNotFoundException();
    Path = libraryDir.FullName;
    Dir = libraryDir;
  }

  public abstract void Scan();
}

class MovieLibrary(string path) : Library<MovieItem>(path)
{
  public override void Scan()
  {
    Items = [];
    foreach (var dir in Dir.EnumerateDirectories())
    {
      var movieItem = new MovieItem(dir);
      movieItem.Scan();
      Items.Add(movieItem);
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
        movie, tv

      Example usage:
        hopparr movie /path/to/movie/library
      """);
      return;
    }


    var library = args[0].ToLower() switch
    {
      "movie" => new MovieLibrary(args[1]),
      "tv" => throw new NotImplementedException("TV library not implemented yet"),
      _ => throw new ArgumentException("Invalid library type")
    };

    Console.WriteLine($"Selected library {library.Path} of type {args[0]}.");

    library.Scan();
    Console.WriteLine($"Scanned {library.Items.Count} items in the library.");

    var problems = from item in library.Items where item.Problems.Count > 0 select item;
    Console.WriteLine($"Found {problems.Count()} items with problems.");

    var itm = library.Items[0];
    Console.WriteLine();
    Console.WriteLine($"""
    {itm.Title} ({itm.Year})
    IMDB: {itm.MetadataProviders.IMDb ?? "N/A"}, TMDB: {itm.MetadataProviders.TMDB ?? "N/A"}, TvDB: {itm.MetadataProviders.TVDB ?? "N/A"}
    Media files:
    """);
    foreach (var mf in itm.MediaFiles ?? [])
    {
      Console.WriteLine($"  - {mf}");
    }
    Console.WriteLine("Problems: ");
    foreach (var problem in itm.Problems)
    {
      Console.WriteLine($"  - {problem}");
    }
  }
}