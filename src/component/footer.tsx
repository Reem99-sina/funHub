import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-white w-full text-md text-gray-500  gap-2 fixed p-10 bottom-0 flex justify-center text-center">
      <a href="/privacy-policy" className="text-blue-500!">
        {t("privacyPolicy")}
      </a>
      <span>|</span>
      <a href="/contact" className="text-blue-500!">
        {t("contactUs")}
      </a>
      |
      <a href="/about" className="text-blue-500!">
        {t("aboutUs")}
      </a>{" "}
    </div>
  );
}

export default Footer;
