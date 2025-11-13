import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer
      className={`w-full bg-white py-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 
      text-center `}
      style={{
        fontFamily:
          i18n.language === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
      }}
    >
      <Link
        to="/privacy-policy"
        className="text-main-color hover:text-main-color font-medium transition-colors duration-300 underline-offset-4 hover:underline text-base md:text-lg"
      >
        {t("privacyPolicy")}
      </Link>

      <span className="text-gray-400">|</span>

      <Link
        to="/contact"
        className="text-main-color hover:text-main-color font-medium transition-colors duration-300 underline-offset-4 hover:underline text-base md:text-lg"
      >
        {t("contactUs")}
      </Link>

      <span className="text-gray-400">|</span>

      <Link
        to="/about"
        className="text-main-color hover:text-main-color font-medium transition-colors duration-300 underline-offset-4 hover:underline text-base md:text-lg"
      >
        {t("aboutUs")}
      </Link>
    </footer>
  );
}

export default Footer;
