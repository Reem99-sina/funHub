import { useTranslation } from "react-i18next";

function Privacy() {
  const {t}=useTranslation()

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-lg font-bold text-red-600 mb-4">{t('PrivacyPolicy')}</h1>
      <p className="mb-4">
        {t('welcomeMessage')}
      </p>
      <p className="mb-4">
      {t('funSitesDescription')}
      </p>
      <p className="italic">
       {t('discoveryQuote')}
      </p>
      <p className="mt-6 text-sm text-gray-500">
       {t('privacyNote')}{" "}
        <a
          href="mailto:contact@funsites.com"
          className="text-blue-600! underline"
        >
          contact@funsites.com
        </a>
        .
      </p>
    </div>
  );
}

export default Privacy;
