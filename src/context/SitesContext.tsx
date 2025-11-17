import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Papa from "papaparse";
import sitesData from "@/data/sites_300_en.json";

export type SiteType = {
  name_en: string;
  name_ar: string;
  url: string;
  category: string;
  description_en: string;
  description_ar: string;
  rating?: number;
};

type SitesContextType = {
  sites: SiteType[];
  rateSite: (index: number, rating: number) => void;
};

const SitesContext = createContext<SitesContextType | undefined>(undefined);

const RATING_KEY = "sites-ratings";

export const SitesProvider = ({ children }: { children: ReactNode }) => {
  const [sites, setSites] = useState<SiteType[]>([]);
  const fetchSitesPage = async (savedRatings: Record<number, number>) => {
    try {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXG7jJEtrf5sNk3HN_-h06xnPAXqKnuTFK0t99VxQ-QKub2f06ImbwxLgqxsuEaHHQINbu2IWfsPKU/pub?gid=451459624&single=true&output=csv";

      const corsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url + "&cacheBust=" + new Date().getTime()
      )}`;

      const res = await fetch(corsUrl);
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true });
      const sheetSites = parsed.data as SiteType[];

      return sheetSites.map((site, index) => ({
        ...site,
        rating: savedRatings[index] || 0,
      }));
    } catch (err) {
      console.error("Failed to fetch Google Sheet, loading local JSON:", err);
      // fallback to local JSON
      return sitesData.map((site, index) => ({
        ...site,
        rating: savedRatings[index] || 0,
      }));
    }
  };
  useEffect(() => {
    // Load user ratings only
    const savedRatings: Record<number, number> = JSON.parse(
      localStorage.getItem(RATING_KEY) || "{}"
    );
    setSites(
      sitesData.map((site, index) => ({
        ...site,
        rating: savedRatings[index] || 0,
      }))
    );
    // Google Sheet CSV
    fetchSitesPage(savedRatings).then((merged) => setSites(merged));

    return () => {
      setSites([]);
    };
  }, []);

  // Save ratings only

  const rateSite = (index: number, rating: number) => {
    if (sites[index].rating == 0) {
      setSites((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], rating };

        // Save only this rating to localStorage
        const savedRatings: Record<number, number> = JSON.parse(
          localStorage.getItem(RATING_KEY) || "{}"
        );
        savedRatings[index] = rating;
        localStorage.setItem(RATING_KEY, JSON.stringify(savedRatings));

        return updated;
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
