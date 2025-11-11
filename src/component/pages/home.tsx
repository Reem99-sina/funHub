import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import sites from "../../data/sites_300_en.json";
import { CustomModalExample, type ModalRef } from "@/component/model";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const refModal = useRef<ModalRef>(null);
  const [randomUrl, setRandomUrl] = useState<undefined | number>();
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // const categories = Array.from(new Set(sites.map((site) => site.category)));

  const goToRandomSite = () => {
    const randomIndex = Math.floor(Math.random() * sites.length);
    setRandomUrl(randomIndex);
    navigate(`/view/${randomIndex}`);

    // window.open(sites[randomIndex].url, "_blank");
  };
  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category);
  //   const filteredSites = selectedCategory
  //     ? sites.filter((site) => site.category === selectedCategory)
  //     : sites;
  //   const randomIndex = Math.floor(Math.random() * filteredSites.length);
  //   setRandomUrl(randomIndex);
  //   refModal?.current?.open();
  // };

  return (
    <div className="bg-white bg-cover bg-center bg-no-repeat min-h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center h-full text-black flex-1 max-w-[50%]">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">{t("title")}</h1>
        <p>{t("description")}</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={goToRandomSite}
          className="relative rounded-full text-lg font-bold text-white
 shadow-[0_0_20px_rgba(0,123,255,0.4)]
hover:shadow-[0_0_30px_rgba(0,123,255,0.6)]
    transition-all duration-300 ease-in-out
    border-2 border-white border-opacity-20
    backdrop-blur-md"
        >
          {/* {t("randomLocation")} */}
          <img src="/logo.PNG" className="w-28" />

          <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full animate-ping"></span>
        </motion.button>

        {/* <div className="flex flex-wrap gap-3 justify-center mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-2 rounded-full border border-pink-400 
              text-pink-600 hover:bg-pink-500 hover:text-white transition-all"
            >
              {category}
            </button>
          ))}
        </div> */}

        <CustomModalExample ref={refModal}>
          <div className="text-center space-y-4 pb-4">
            {/* عنوان الموقع */}
            <h2 className="text-2xl font-orbitron text-neonPink drop-shadow-[0_0_10px_#ff00ff]">
              {randomUrl !== undefined
                ? i18n.language == "ar"
                  ? sites[randomUrl]?.name_ar
                  : sites[randomUrl]?.name_en
                : null}
            </h2>

            {/* وصف الموقع */}
            <p className="text-base text-neonBlue max-w-xl mx-auto leading-relaxed">
              {randomUrl !== undefined &&
                (i18n.language === "ar"
                  ? sites[randomUrl].description_ar
                  : sites[randomUrl].description_en)}
            </p>
            <button
              onClick={() => {
                if (randomUrl !== undefined) {
                  window.open(sites[randomUrl].url, "_blank");
                }
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              {t("openInNewTab")}
            </button>
          </div>
        </CustomModalExample>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Home;
