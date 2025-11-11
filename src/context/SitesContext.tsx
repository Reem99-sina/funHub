// src/context/SitesContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import sitesData from "@/data/sites_300_en.json";

export type SiteType = {
  name_en: string;
  name_ar: string;
  url: string;
  category: string;
  description_en: string;
  description_ar: string;
  rating?: number; // rating 1-5
};

type SitesContextType = {
  sites: SiteType[];
  rateSite: (index: number, rating: number) => void;
};

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export const SitesProvider = ({ children }: { children: ReactNode }) => {
  // Load from localStorage or default JSON
  const [sites, setSites] = useState<SiteType[]>(() => {
    const saved = localStorage.getItem("sites-ratings");
    if (saved) {
      try {
        const parsed: SiteType[] = JSON.parse(saved);
        return parsed;
      } catch (err) {
        console.error("Failed to parse localStorage sites:", err);
      }
    }

    // Add rating: 0 to all sites
    return sitesData.map((site) => ({ ...site, rating: 0 }));
  });

  // Sync to localStorage whenever sites change
  useEffect(() => {
    localStorage.setItem("sites-ratings", JSON.stringify(sites));
  }, [sites]);

  const rateSite = (index: number, rating: number) => {
    setSites((prev) => {
      const newSites = [...prev];
      newSites[index] = { ...newSites[index], rating };
      return newSites;
    });
  };

  return (
    <SitesContext.Provider value={{ sites, rateSite }}>
      {children}
    </SitesContext.Provider>
  );
};

export const useSites = () => {
  const context = useContext(SitesContext);
  if (!context) throw new Error("useSites must be used within SitesProvider");
  return context;
};
