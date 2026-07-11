import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WatchTab from "@/components/watchlist/WatchTab";

import { UserWatchlist } from "@/types/user";
import { CheckIcon, EyeIcon } from "lucide-react";

export default async function WatchlistPage() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/watchlist`);
  if (!response.ok) {
    throw new Error("couldn't fetch data");
  }

  const UserWatchlist: UserWatchlist = await response.json();

  return (
    <main>
      <div className="container mt-25 sm:mt-30 min-h-screen">
        <Tabs defaultValue="preview">
          <TabsList variant="line">
            <TabsTrigger value="watchlist">
              <EyeIcon />
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="watched">
              <CheckIcon />
              Watched
            </TabsTrigger>
          </TabsList>
          <TabsContent value="watchlist">
            <WatchTab content={UserWatchlist.saved} type="watchlist" />
          </TabsContent>
          <TabsContent value="watched">
            <WatchTab content={UserWatchlist.watched} type="watched" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
