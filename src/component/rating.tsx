import { useSites } from "@/context/SitesContext";

export default function Rating({ siteIndex }: { siteIndex: number }) {
  const { sites, rateSite } = useSites();
  const rating = sites[siteIndex]?.rating || 0;

  return (
    <div className="flex justify-start gap-2 mt-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => rateSite(siteIndex, star)}
          className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
       {rating > 0 && <span className="ml-2 text-sm">({rating}/5)</span>}
    </div>
  );
}
