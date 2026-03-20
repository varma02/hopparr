import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { ProfileMenu } from "./ProfileMenu";

import Logo from "../../../media/logo/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-full py-4 px-6 grid grid-cols-3 place-items-center z-30">
      <div className="absolute w-full h-full bg-linear-to-b from-background to-transparent"></div>
      <div className="flex items-center gap-2 mr-auto z-10 backdrop-blur-md pr-2 py-1 rounded-md">
        <img className="object-contain h-8" src={Logo} alt="Hopparr Logo" />
        <h1 className="text-xl font-bold">Hopparr</h1>
      </div>
      <Tabs defaultValue="" className="z-10">
        <TabsList className="bg-background/20 backdrop-blur-md">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tv-shows">TV Shows</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="ml-auto flex items-center z-10">
        <ProfileMenu />
      </div>
    </header>
  );
}
