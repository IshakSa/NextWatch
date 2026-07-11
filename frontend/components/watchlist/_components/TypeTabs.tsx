import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SortKey} from "./SortButton";

export type ActiveType = "all" | "movie" | "tv";

export default function TypeTabs({
                                     activeType,
                                     setActiveType,
                                     sortedBy,
                                     setSortedBy,
                                 }: {
    activeType: ActiveType;
    setActiveType: (newActiveType: ActiveType) => void;
    sortedBy: SortKey;
    setSortedBy: (newSortedBy: SortKey) => void;
}) {
    function handleTypeChange(value: ActiveType) {
        if (value === "all" && (sortedBy === "runtime-desc")) {
            setSortedBy("added-desc");
        }
        setActiveType(value);
    }

    return (
        <Tabs value={activeType} onValueChange={handleTypeChange} className="mr-3">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="movie">Movies</TabsTrigger>
                <TabsTrigger value="tv">Series</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
