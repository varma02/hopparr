import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="mt-6 py-4 px-6 bg-card">
      <p className="text-center">
        The Hopparr project is available on
        <a
          href="https://github.com/varma02/hopparr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="link" className="underline px-1">
            Github
          </Button>
        </a>
        under the
        <a
          href="https://github.com/varma02/hopparr/blob/main/license"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="link" className="underline pr-0 pl-1">
            MIT License
          </Button>
        </a>
        .
      </p>
    </footer>
  );
}
