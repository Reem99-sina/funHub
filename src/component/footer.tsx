import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="text-md text-gray-500 flex gap-2">
      <a href="/privacy-policy" className="!text-pink-500">
        {t("privacyPolicy")}
      </a>
      <span>|</span>
      <a href="/contact" className="!text-pink-500">
        {t("contactUs")}
      </a>
      |
      <a href="/about" className="!text-pink-500">
        {t("aboutUs")}
      </a>{" "}
    </div>
  );
}

export default Footer;
