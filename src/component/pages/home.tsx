import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import sites from "../../data/sites_300_en.json";
import { CustomModalExample, type ModalRef } from "@/component/model";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const refModal = useRef<ModalRef>(null);
  const [randomUrl, setRandomUrl] = useState<undefined | number>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const goToRandomSite = () => {
    const randomIndex = Math.floor(Math.random() * sites.length);
    setRandomUrl(randomIndex);
    navigate(`/view/${randomIndex}`,{ state: { navigatedTo: true }});
  };

  return (
    <div className="bg-white bg-cover bg-center bg-no-repeat min-h-full w-full flex flex-col items-center justify-center my-auto">
      <div className="flex flex-col gap-6 items-center justify-center h-full text-black flex-1 max-w-[90%] md:max-w-[25%] text-center">

        {/* الزر */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={goToRandomSite}
          className="relative rounded-full text-lg font-bold text-white 
          shadow-[0_0_25px_rgba(255,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,0,0,0.7)]
          transition-all duration-300 ease-in-out border-2 border-white/30 
          backdrop-blur-md "
        >
          <img src="/button.png" className="w-36 rounded-full" alt="fun" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full animate-ping"></span>
        </motion.button>

        {/* العناوين والنصوص */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-black drop-shadow-sm tracking-wide">
          {t("title")}
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-main-color">
          {t("subTitle")}
        </h2>

        <p className="text-base md:text-lg text-black leading-relaxed max-w-md italic">
          {t("description")}
        </p>

        {/* المودال */}
        <CustomModalExample ref={refModal}>
          <div className="text-center space-y-5 pb-4">
            {/* عنوان الموقع */}
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-pink-500 drop-shadow-[0_0_10px_#ff00ff]">
              {randomUrl !== undefined
                ? i18n.language == "ar"
                  ? sites[randomUrl]?.name_ar
                  : sites[randomUrl]?.name_en
                : null}
            </h2>

            {/* وصف الموقع */}
            <p className="text-base md:text-lg text-blue-700 max-w-xl mx-auto leading-relaxed font-medium">
              {randomUrl !== undefined &&
                (i18n.language === "ar"
                  ? sites[randomUrl].description_ar
                  : sites[randomUrl].description_en)}
            </p>

            {/* الزر */}
            <button
              onClick={() => {
                if (randomUrl !== undefined) {
                  window.open(sites[randomUrl].url, "_blank");
                }
              }}
              className="bg-linear-to-r from-red-500 to-red-500 hover:from-red-600 hover:to-red-600 
              text-white font-semibold py-3 px-8 rounded-full text-lg 
              transition-transform duration-300 hover:scale-105 shadow-lg"
            >
              {t("openInNewTab")}
            </button>
          </div>
        </CustomModalExample>
      </div>
    </div>
  );
}

export default Home;
