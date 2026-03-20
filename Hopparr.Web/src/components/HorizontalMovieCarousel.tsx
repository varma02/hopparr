import { cn } from "#/lib/utils";
import { MovieCard } from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselOptions,
} from "./ui/carousel";

export type HorizontalMovieCarouselProps = {
  title: string;
  movies: {
    movieID: string;
    seasonID?: string;
    episodeID?: string;
    title: string;
    image: string;
  }[];
  cardOrientation?: "horizontal" | "vertical";
  className?: string;
};

export function HorizontalMovieCarousel({
  title,
  movies,
  cardOrientation = "horizontal",
  className,
}: HorizontalMovieCarouselProps) {
  const carouselOpts: Partial<CarouselOptions> = {
    active: true,
    loop: false,
    align: "start",
    axis: "x",
  };

  return (
    <Carousel opts={carouselOpts} className={cn("w-full", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex gap-2">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </div>
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem
            key={movie.movieID}
            className={
              cardOrientation === "vertical"
                ? "basis-1/3 md:basis-1/6 lg:basis-1/8"
                : "basis-1/2 md:basis-1/3 lg:basis-1/4"
            }
          >
            <MovieCard
              orientation={cardOrientation}
              details={{
                to: movie.seasonID
                  ? `/details/$movID/season/$seasonID`
                  : "/details/$movID",
                params: { movID: movie.movieID, seasonID: movie.seasonID },
                hash: movie.episodeID && `ep${movie.episodeID}`,
              }}
              play={{ to: "/" }}
              title={movie.title}
              image={movie.image}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
