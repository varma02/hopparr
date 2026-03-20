import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LucidePlay } from "lucide-react";
import { cn } from "#/lib/utils";

type MovieImageWithPlayButtonProps = {
  orientation?: "horizontal" | "vertical";
  play: LinkComponentProps;
  image: string;
  className?: string;
};

export function MovieImageWithPlayButton({
  play,
  image,
  orientation = "horizontal",
  className,
}: MovieImageWithPlayButtonProps) {
  return (
    <div
      className={cn(
        "relative group rounded-md overflow-hidden flex",
        orientation === "vertical" ? "aspect-2/3" : "aspect-16/10",
        className,
      )}
    >
      <img className="object-cover object-center flex-1" src={image} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link {...play}>
          <Button
            size="icon-lg"
            variant="secondary"
            type="button"
            className="opacity-0 group-hover:opacity-100"
          >
            <LucidePlay />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export type MovieCardProps = MovieImageWithPlayButtonProps & {
  details: LinkComponentProps;
  title: string;
  className?: string;
};

export function MovieCard({
  orientation = "horizontal",
  details,
  play,
  title,
  image,
  className,
}: MovieCardProps) {
  return (
    <Link {...details} className={className}>
      <MovieImageWithPlayButton
        play={play}
        image={image}
        orientation={orientation}
      />
      <h3 className="mx-auto w-max max-w-3/4 text-center hover:underline">
        {title}
      </h3>
    </Link>
  );
}
