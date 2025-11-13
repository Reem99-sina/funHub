import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-main-color mb-8 tracking-wide">
        {t("aboutUs")}
      </h1>

      {/* Intro Section */}
      <div className="space-y-5 text-black  text-base md:text-lg leading-relaxed">
        <p className="font-semibold text-black ">{t("funopiWelcome")}</p>
        <p>{t("funopiIntro")}</p>
        <p>{t("funopiDescription")}</p>
      </div>

      {/* Experience Section */}
      <div className="mt-10 text-start bg-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl md:text-2xl font-semibold text-main-color mb-4">
          {t("funopiExperienceTitle")}
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-black ">
          <li>{t("funopiFeatures1")}</li>
          <li>{t("funopiFeatures2")}</li>
          <li>{t("funopiFeatures3")}</li>
          <li>{t("funopiFeatures4")}</li>
        </ul>
      </div>

      {/* Goal Section */}
      <div className="mt-8 text-start text-black  text-base md:text-lg leading-relaxed space-y-3">
        <p>{t("funopiGoal")}</p>
        <p>{t("funopiDailyUpdate")}</p>
      </div>

      {/* Closing Quote */}
      <blockquote className="border-l-4 border-main-color pl-4 italic text-black  text-lg md:text-xl mt-10">
        {t("funopiClosing")}
      </blockquote>
    </div>
  );
}
