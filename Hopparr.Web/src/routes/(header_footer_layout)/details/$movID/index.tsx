import { MovieCard } from "#/components/MovieCard";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { LucideEyeOff, LucideHeart, LucidePlay } from "lucide-react";

export const Route = createFileRoute("/(header_footer_layout)/details/$movID/")({
  component: MovieDetails,
});

function MovieDetails() {
  return (
    <main className="min-h-screen pt-18 relative">
      <img
        className="-z-10 absolute top-0 left-0 blur-sm opacity-75 w-full h-full max-h-screen object-cover object-center"
        src="https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg"
        alt="The Boys background image"
      />
      <div className="mt-32 px-6">
        <h2 className="text-4xl font-bold">The Boys</h2>
        <p className="flex gap-2 mt-2">
          <Badge variant="secondary">Comedy</Badge>
          <Badge variant="secondary">Crime</Badge>
          <Badge variant="secondary">Action</Badge>
        </p>
        <p className="mt-2 text-lg text-secondary-foreground">
          2019 | TV-MA | 2h 20m | Ends at 13:24
        </p>
        <div className="flex gap-2 mt-4">
          <Button size="lg">
            <LucidePlay />
            Play
          </Button>
          <Button size="lg" variant="secondary">
            <LucideEyeOff />
            Mark as watched
          </Button>
          <Button variant="secondary" size="icon">
            <LucideHeart className="fill-primary stroke-primary" />
          </Button>
        </div>
      </div>
      <div className="px-6 mt-12 max-w-1/2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          reiciendis maiores placeat voluptatibus, veniam in. Cupiditate iure
          earum optio neque eius, asperiores culpa eveniet.
        </p>
      </div>
      <ol className="w-full px-6 mt-24 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <MovieCard
              orientation="vertical"
              details={{
                to: "/details/$movID/season/$seasonID",
                params: { seasonID: `${i + 1}`, movID: "1" },
              }}
              play={{ to: "/" }}
              title={`Season ${i + 1}`}
              image="https://image.tmdb.org/t/p/original/zBi4Otjddaa92ecwcNDEIhQFxcl.jpg"
            />
          </li>
        ))}
      </ol>
    </main>
  );
}
