import { useNavigate, useParams } from "react-router-dom";
import { useSites } from "@/context/SitesContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigationType } from "react-router-dom";

export default function WebsiteViewer() {
  const { siteIndex } = useParams();
  const { sites } = useSites();
  const navType = useNavigationType();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const [loading, setLoading] = useState(true); // ✅ حالة التحميل
  const site = siteIndex ? sites[Number(siteIndex)] : sites[0];

  useEffect(() => {
    if (!siteIndex || sites.length === 0) return;

    const newIndex = Math.floor(Math.random() * sites.length);
    if (navType === "REPLACE" || navType === "POP") {
      navigate(`/view/${newIndex}`, { replace: true });
    }
  }, [sites.length]);

  if (!site) return <div>Website not found</div>;

  return (
    <div className="flex flex-col min-h-[83.5vh] w-full relative">
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      <iframe
        src={site.url}
        title={i18n.language === "ar" ? site?.name_ar : site?.name_en}
        className="w-full grow border-none"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setLoading(false)} // ✅ عند تحميل الموقع نوقف الـ loading
      />
    </div>
  );
}
