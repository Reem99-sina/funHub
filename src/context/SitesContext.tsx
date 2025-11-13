import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Papa from "papaparse";
// import sitesData from "@/data/sites_300_en.json"; // no longer needed

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
const SITES_VERSION = "1.4";

export const SitesProvider = ({ children }: { children: ReactNode }) => {
  const [sites, setSites] = useState<SiteType[]>([]);

  // Load from Google Sheet OR localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sites-ratings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version === SITES_VERSION) {
          setSites(parsed.sites);
          return; // stop here if localStorage is valid
        }
      } catch {}
    }

    // If no valid localStorage, fetch from Google Sheet
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXG7jJEtrf5sNk3HN_-h06xnPAXqKnuTFK0t99VxQ-QKub2f06ImbwxLgqxsuEaHHQINbu2IWfsPKU/pub?gid=451459624&single=true&output=csv";
    const corsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      url
    )}`;
    fetch(corsUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        // Add rating=0 to each site
        const sheetSites = parsed.data.map((site: any) => ({
          ...site,
          rating: 0,
        })) as SiteType[];
        setSites(sheetSites);
      })
      .catch((err) => {
        console.error("Failed to fetch Google Sheet:", err);
        setSites([]); // fallback empty
      });
  }, []);

  // Sync to localStorage whenever sites change
  useEffect(() => {
    if (sites.length === 0) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "sites-ratings",
        JSON.stringify({ version: SITES_VERSION, sites })
      );
    }, 500);
    return () => clearTimeout(timeout);
  }, [sites]);

  const rateSite = (index: number, rating: number) => {
    if (sites[index]?.rating === 0) {
      setSites((prev) => {
        const newSites = [...prev];
        newSites[index] = { ...newSites[index], rating };
        return newSites;
      });
    }
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
