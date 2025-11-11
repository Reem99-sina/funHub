import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type RatingMap = Record<string, number>;

interface RatingContextType {
  ratings: RatingMap;
  rateSite: (siteId: string, value: number) => void;
  getRating: (siteId: string) => number | null;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<RatingMap>({});

  // Load ratings from localStorage once
  useEffect(() => {
    const savedRatings: RatingMap = {};
    for (let key in localStorage) {
      if (key.startsWith("rating-")) {
        const siteId = key.replace("rating-", "");
        const value = parseInt(localStorage.getItem(key) || "0");
        if (value) savedRatings[siteId] = value;
      }
    }
    setRatings(savedRatings);
  }, []);

  // Rate a site
  const rateSite = (siteId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [siteId]: value }));
    localStorage.setItem(`rating-${siteId}`, value.toString());
   
  };

  // Get rating for one site
  const getRating = (siteId: string) => ratings[siteId] ?? null;

  return (
    <RatingContext.Provider value={{ ratings, rateSite, getRating }}>
      {children}
    </RatingContext.Provider>
  );
}

// Custom hook for easy access
export function useRating() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}
