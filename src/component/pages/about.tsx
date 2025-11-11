import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">{t('aboutUsTitle')}</h1>

      <p className="text-gray-700 leading-relaxed">
       {t('aboutUsWelcome')}
      </p>

      <p className="mt-4 text-gray-700 leading-relaxed">
       {t('aboutUsDescription')}
      </p>

      <p className="mt-6 text-gray-600 italic">
       {t('aboutUsQuote')}
      </p>
    </div>
  );
}
