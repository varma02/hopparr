import { MovieImageWithPlayButton } from "#/components/MovieCard";
import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LucideEyeOff, LucideHeart, LucidePlay } from "lucide-react";

export const Route = createFileRoute(
  "/(header_footer_layout)/details/$movID/season/$seasonID",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { movID, seasonID } = Route.useParams();

  return (
    <main className="min-h-screen pt-18 flex gap-6">
      <img
        className="-z-10 fixed top-0 left-0 blur-sm opacity-75 w-full h-full max-h-screen object-cover object-center"
        src="https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg"
        alt="The Boys background image"
      />
      <div className="mt-32 px-6 sticky top-24 h-max max-w-lg">
        <Link to="/details/$movID" params={{ movID: movID }}>
          <h2 className="text-2xl font-semibold hover:underline">The Boys</h2>
        </Link>
        <h3 className="text-4xl font-bold">Season {seasonID}</h3>
        <p className="mt-2 text-lg text-secondary-foreground">
          2019 | TV-MA | 10 Episodes
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
        <div className="mt-12">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            reiciendis maiores placeat voluptatibus, veniam in. Cupiditate iure
            earum optio neque eius, asperiores culpa eveniet.
          </p>
        </div>
      </div>
      <ol className="flex flex-col gap-6 mt-32">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className="mt-4 gap-4 flex">
            <MovieImageWithPlayButton
              orientation="horizontal"
              image="https://image.tmdb.org/t/p/original/z0T0nGlKjA3pGSWavuDjTA4e7xK.jpg"
              play={{ to: "/" }}
              className="max-w-sm"
            />
            <div className="flex-1">
              <h4
                className="text-xl font-semibold scroll-mt-24"
                id={`ep${i + 1}`}
              >
                Episode {i + 1} - Lorem, ipsum dolor.
              </h4>
              <p className="text-secondary-foreground">
                1h 15m | Ends at 13:34
              </p>
              <div className="flex gap-2 my-2">
                <Button>
                  <LucidePlay />
                  Play
                </Button>
                <Button variant="secondary">
                  <LucideEyeOff />
                  Mark as watched
                </Button>
                <Button variant="secondary" size="icon">
                  <LucideHeart className="fill-primary stroke-primary" />
                </Button>
              </div>
              <p className="text-secondary-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda reiciendis maiores placeat voluptatibus, veniam in.
                Cupiditate iure earum optio neque eius, asperiores culpa
                eveniet.
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
