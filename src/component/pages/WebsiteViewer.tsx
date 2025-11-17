import { useNavigate, useParams } from "react-router-dom";

import { useSites } from "@/context/SitesContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigationType } from "react-router-dom";

export default function WebsiteViewer() {
  const { siteIndex } = useParams();
  const { sites } = useSites();
  const navType = useNavigationType();

  const navigate = useNavigate();
  const { i18n } = useTranslation();
  // const [initialized, setInitialized] = useState(false);
  const site = siteIndex ? sites[Number(siteIndex)] : sites[0];

  useEffect(() => {
    if (!siteIndex || sites.length === 0) return;

    // نغير index فقط عند refresh وليس عند الضغط على Card

    const newIndex = Math.floor(Math.random() * sites.length);
    if (navType == "REPLACE" || navType == "POP") {
      navigate(`/view/${newIndex}`, { replace: true });
    }
  }, [sites.length]);

  if (!site) return <div>Website not found</div>;

  return (
    <div className="flex flex-col min-h-[83.5vh] w-full">
      <iframe
        src={site.url}
        title={i18n.language === "ar" ? site?.name_ar : site?.name_en}
        className="w-full grow border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
