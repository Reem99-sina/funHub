import { useTranslation } from "react-i18next";
import {
  Shield,
  Globe,
  Database,
  Link2,
  Megaphone,
  Lock,
  RefreshCcw,
} from "lucide-react";

function Privacy() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Database,
      title: t("privacySection1Title"),
      points: [
        t("privacySection1Point1"),
        t("privacySection1Point2"),
        t("privacySection1Point3"),
      ],
    },
    {
      icon: Globe,
      title: t("privacySection2Title"),
      points: [t("privacySection2Point1"), t("privacySection2Point2")],
    },
    {
      icon: Link2,
      title: t("privacySection3Title"),
      desc: t("privacySection3Desc"),
    },
    {
      icon: Megaphone,
      title: t("privacySection4Title"),
      desc: t("privacySection4Desc"),
    },
    {
      icon: Lock,
      title: t("privacySection5Title"),
      desc: t("privacySection5Desc"),
    },
    {
      icon: RefreshCcw,
      title: t("privacySection6Title"),
      desc: t("privacySection6Desc"),
    },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="flex items-center gap-3 mb-3 justify-center">
          <Shield className="text-red-600 w-8 h-8" />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            {t("privacyTitle")} - <span className="text-red-600">FUNOPI</span>
          </h1>
        </div>

        {/* المقدمة */}
        <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed ">
          {t("privacyIntro")}
        </p>

        {/* الأقسام */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 text-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-6 h-6 text-red-500" />
              <h2 className="text-xl md:text-2xl font-semibold text-red-600">
                {section.title}
              </h2>
            </div>

            {section.points && (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {section.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {section.desc && (
              <p className="text-gray-700 leading-relaxed">{section.desc}</p>
            )}
          </div>
        ))}

        {/* التواصل */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 mt-4 text-gray-700">
          <p className="text-base md:text-lg leading-relaxed">
            {t("privacyContact")}{" "}
            <a
              href="mailto:contact@funopi.com"
              className="text-red-500 hover:text-red-600 underline underline-offset-4 transition-colors duration-300 font-medium"
            >
              contact@funopi.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
