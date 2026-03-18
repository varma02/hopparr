import { Button } from "#/components/ui/button";
import { LucidePlay, LucideHeart } from "lucide-react";

export function MovieBanner({}) {
  return (
    <article className="w-full relative">
      <img
        className="opacity-75 w-full aspect-video object-cover object-center"
        src="https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg"
        alt="The Boys backdrop image"
      />
      <div className="absolute left-0 bottom-0 w-full h-24 bg-linear-to-t from-background to-transparent"></div>

      <div className="absolute left-6 bottom-2/6 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-white">The Boys</h1>
        <p className="text-lg text-white/80 mt-2">
          A group of vigilantes set out to take down corrupt superheroes.
        </p>
        <div className="flex gap-2 mt-4 scale-120 translate-x-14">
          <Button>
            <LucidePlay />
            Play
          </Button>
          <Button variant="secondary">More Info</Button>
          <Button variant="ghost" size="icon">
            <LucideHeart className="fill-primary stroke-primary" />
          </Button>
        </div>
      </div>
    </article>
  );
}
