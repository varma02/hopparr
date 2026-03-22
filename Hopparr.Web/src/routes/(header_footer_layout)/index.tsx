import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselOptions,
} from "#/components/ui/carousel";
import { createFileRoute } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { MovieBanner } from "#/components/MovieBanner";
import { HorizontalMovieCarousel } from "#/components/HorizontalMovieCarousel";
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl } from "#/lib/utils";
import { Spinner } from "#/components/ui/spinner";

export const Route = createFileRoute("/(header_footer_layout)/")({
  component: App,
});

function App() {
  const heroCarouselOpts: Partial<CarouselOptions> = {
    active: true,
    loop: true,
    align: "start",
    axis: "x",
  };
  const heroCarouselAutoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
  });

  const heroMovies = useQuery({
    queryKey: ["hero-movies"],
    queryFn: async () => {
      const res = await fetch(new URL("Movies", apiBaseUrl()));
      console.log(res);
      return res.json();
    },
  });

  if (heroMovies.isPending) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <Spinner className="size-16" />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <Carousel opts={heroCarouselOpts} plugins={[heroCarouselAutoplay]}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <MovieBanner />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <HorizontalMovieCarousel
        className="px-6 -mt-20"
        title="Continue Watching"
        cardOrientation="horizontal"
        movies={Array.from({ length: 10 }).map(() => ({
          movieID: "1",
          seasonID: "1",
          episodeID: "6",
          title: "The Boys",
          image:
            "https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg",
        }))}
      />

      <HorizontalMovieCarousel
        className="px-6 mt-12"
        title="On your watchlist"
        cardOrientation="vertical"
        movies={Array.from({ length: 10 }).map(() => ({
          movieID: "1",
          title: "Fallout",
          image:
            "https://image.tmdb.org/t/p/original/c15BtJxCXMrISLVmysdsnZUPQft.jpg",
        }))}
      />

      <HorizontalMovieCarousel
        className="px-6 mt-12"
        title="Recommended for you"
        cardOrientation="vertical"
        movies={Array.from({ length: 10 }).map(() => ({
          movieID: "1",
          title: "The Boys",
          image:
            "https://image.tmdb.org/t/p/original/zBi4Otjddaa92ecwcNDEIhQFxcl.jpg",
        }))}
      />

      <HorizontalMovieCarousel
        className="px-6 mt-12"
        title="Trending right now"
        cardOrientation="vertical"
        movies={Array.from({ length: 10 }).map(() => ({
          movieID: "1",
          title: "The Boys",
          image:
            "https://image.tmdb.org/t/p/original/zBi4Otjddaa92ecwcNDEIhQFxcl.jpg",
        }))}
      />
    </main>
  );
}
