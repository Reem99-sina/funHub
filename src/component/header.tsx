import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "./rating";
import { useSites } from "@/context/SitesContext";
import { Languages } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const siteIndex = location.pathname?.split("/").pop()
    ? Number(location.pathname?.split("/").pop())
    : 0;
  const { i18n, t } = useTranslation();
  const { sites } = useSites();
  const site = siteIndex ? sites[Number(siteIndex)] : sites[0];
  const linkStyle = (path: string) =>
    `px-2 py-1 rounded-md text-sm md:text-sm font-medium transition duration-300 ${
      location.pathname === path
        ? "text-red-600 font-semibold underline underline-offset-4"
        : "text-red-600 hover:text-red-700 hover:underline underline-offset-4"
    }`;

  return location.pathname.includes("view") ||
    location.pathname.includes("best-sites") ||
    location.pathname.includes("about") ||
    location.pathname.includes("contact") ||
    location.pathname.includes("privacy-policy") ? (
    <header className="w-full bg-white border-b border-gray-200 ">
      <div className="container mx-auto flex justify-between items-center px-4 pt-3 pb-1">
        {/* Logo / Site Name */}
        <div className=" flex  gap-3">
          <div className="text-black text-start flex items-center gap-4">
            <div
              className="text-xl font-bold text-red-600 cursor-pointer"
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * sites.length);
                navigate(`/view/${randomIndex}`);
              }}
            >
              <img src="/button.png" className="w-16" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                {i18n.language == "ar" ? site?.name_ar : site?.name_en}
              </h3>
               <p className="text-sm  text-gray-600 leading-snug font-medium mt-1">
              {i18n.language === "ar"
                ? site?.description_ar
                : site?.description_en}
            </p>

              <nav className="flex  items-center ">
                <Link to="/" className={linkStyle("/")}>
                  {t("home")}
                </Link>
                <span>|</span>
                <Link to="/best-sites" className={linkStyle("/best-sites")}>
                  {t("bestSites")}
                </Link>
                {/* <Link to="/" className=" text-red-600! text-sm  transition">
                  {t("backToHome")}
                </Link> */}
                <Languages
                  className="text-red-600 cursor-pointer"
                  onClick={() =>
                    i18n.changeLanguage(i18n.language == "ar" ? "en" : "ar")
                  }
                />
              </nav>
                {site && <Rating siteIndex={Number(siteIndex)} />}
              
            </div>
          </div>
        </div>
      </div>
    </header>
  ) : null;
}
