import { defaultFilterPayload, FilterPayload } from "@/components/actions/FilterButton/constants";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type FilterContextType = {
  activeFilterPayload: FilterPayload;
  setActiveFilterPayload: Dispatch<SetStateAction<FilterPayload>>;
  currentFilterPayload: FilterPayload;
  setCurrentFilterPayload: Dispatch<SetStateAction<FilterPayload>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilterPayload, setActiveFilterPayload] = useState(defaultFilterPayload);
  const [currentFilterPayload, setCurrentFilterPayload] = useState(defaultFilterPayload);

  return (
    <FilterContext.Provider
      value={{
        currentFilterPayload,
        setCurrentFilterPayload,
        activeFilterPayload,
        setActiveFilterPayload,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
