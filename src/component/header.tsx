import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "./rating";
import { useSites } from "@/context/SitesContext";
import { Languages } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const siteIndex = location.pathname?.split("/").pop()
    ? Number(location.pathname?.split("/").pop())
    : 0;
  const { i18n, t } = useTranslation();
  const { sites } = useSites();
  const site = siteIndex ? sites[Number(siteIndex)] : sites[0];
  const linkStyle = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "text-blue-600! font-semibold"
        : "text-gray-700! hover:text-blue-600!"
    }`;

  return (
    <header className="w-full bg-white border-b border-gray-200 ">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Site Name */}
        <div className=" flex  gap-3">
          <Link to="/" className="text-xl font-bold text-blue-600">
            <img src="/mainlogo.png" className="w-28" />
          </Link>
          {location.pathname.includes("view") ? (
            <div className="text-black text-start">
              <h3>{i18n.language == "ar" ? site?.name_ar : site?.name_en}</h3>
              <p>
                {i18n.language == "ar"
                  ? site.description_ar
                  : site.description_en}
              </p>
              {site && <Rating siteIndex={Number(siteIndex)} />}
              <Link to="/" className=" text-blue-600! text-sm  transition">
                {t("backToHome")}
              </Link>
            </div>
          ) : null}
        </div>
        {/* Navigation Links */}
        {!location.pathname.includes("view") && (
          <nav className="flex gap-4 items-center text-lg">
            <Link to="/" className={linkStyle("/")}>
              {t("home")}
            </Link>
            <Link to="/best-sites" className={linkStyle("/best-sites")}>
              {t("bestSites")}
            </Link>
            <Languages
              className="text-blue-500 cursor-pointer"
              onClick={() =>
                i18n.changeLanguage(i18n.language == "ar" ? "en" : "ar")
              }
            />
          </nav>
        )}
      </div>
    </header>
  );
}
