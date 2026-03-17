import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { ProfileMenu } from "./ProfileMenu";

import Logo from "../../../media/logo/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-full py-4 px-6 flex justify-between items-center z-20">
      <div className="flex gap-2">
        <img className="object-contain h-8" src={Logo} alt="Hopparr Logo" />
        <h1 className="text-xl font-bold">Hopparr</h1>
      </div>
      <Tabs defaultValue="home">
        <TabsList className="bg-background/20 backdrop-blur-md">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tv-shows">TV Shows</TabsTrigger>
        </TabsList>
      </Tabs>
      <ProfileMenu />
    </header>
  );
}
