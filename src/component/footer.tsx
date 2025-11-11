import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-white w-full text-sm text-gray-500  gap-2  p-10 bottom-0 flex justify-center text-center">
      <a href="/privacy-policy" className="text-red-500! single-line! underline!">
        {t("privacyPolicy")}
      </a>
      <span>|</span>
      <a href="/contact" className="text-red-500! single-line! underline!">
        {t("contactUs")}
      </a>
      |
      <a href="/about" className="text-red-500! single-line! underline!">
        {t("aboutUs")}
      </a>{" "}
    </div>
  );
}

export default Footer;
