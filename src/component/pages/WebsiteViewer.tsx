import { useParams } from "react-router-dom";

import { useSites } from "@/context/SitesContext";
import { useTranslation } from "react-i18next";

export default function WebsiteViewer() {
  const { siteIndex } = useParams();
  const { sites } = useSites();
  // Load your sites data (same as in Home)
  const { i18n } = useTranslation();
  const site = siteIndex ? sites[Number(siteIndex)] : sites[0];

  if (!site) return <div>Website not found</div>;

  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* Header */}

      {/* Website view */}
      <iframe
        src={site.url}
        title={i18n.language == "ar" ? site?.name_ar : site?.name_en}
        className="grow w-full border-none"
        sandbox="allow-scripts allow-same-origin"
        // allowFullScreen={true}
        // allow="fullscreen"
      />
      
    </div>
  );
}
