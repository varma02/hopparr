import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselOptions,
} from "#/components/ui/carousel";
import { createFileRoute } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { MovieBanner } from "#/components/MovieBanner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const carouselOpts: Partial<CarouselOptions> = {
    active: true,
    loop: true,
    align: "start",
    axis: "x",
  };
  const carouselAutoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
  });

  return (
    <main className="flex-1">
      <Carousel opts={carouselOpts} plugins={[carouselAutoplay]}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <MovieBanner />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Continue watching</h2>
      </section> */}
    </main>
  );
}
