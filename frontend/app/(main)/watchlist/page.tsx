import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WatchTab from "@/components/watchlist/WatchTab";

import { UserWatchlist } from "@/types/user";
import { CheckIcon, EyeIcon } from "lucide-react";
import { request } from "@/lib/requestHandler";

export default async function WatchlistPage() {
  const userWatchlist: UserWatchlist = await request("/api/watchlist", "couldn't fetch data");

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
            <WatchTab content={userWatchlist.saved} type="watchlist" />
          </TabsContent>
          <TabsContent value="watched">
            <WatchTab content={userWatchlist.watched} type="watched" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
