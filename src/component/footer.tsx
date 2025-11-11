import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-white w-full text-sm text-gray-500  gap-2  p-10 bottom-0 flex justify-center text-center">
      <Link to="/privacy-policy" className="text-red-500! single-line! underline!">
        {t("privacyPolicy")}
      </Link>
      <span>|</span>
      <Link to="/contact" className="text-red-500! single-line! underline!">
        {t("contactUs")}
      </Link>
      |
      <Link to="/about" className="text-red-500! single-line! underline!">
        {t("aboutUs")}
      </Link>{" "}
    </div>
  );
}

export default Footer;
