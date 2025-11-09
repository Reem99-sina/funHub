import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import sites from "../../data/sites_300_en.json";
import { CustomModalExample, type ModalRef } from "@/component/model";
import Footer from "@/component/footer";

function Home() {
    const refModal = useRef<ModalRef>(null);
  const [count, setCount] = useState(0);
  const [randomUrl, setRandomUrl] = useState<undefined | number>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const categories = Array.from(new Set(sites.map((site) => site.category)));

  const goToRandomSite = () => {
    const randomIndex = Math.floor(Math.random() * sites.length);
    setRandomUrl(randomIndex);
    refModal?.current?.open();

    // window.open(sites[randomIndex].url, "_blank");
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const filteredSites = selectedCategory
      ? sites.filter((site) => site.category === selectedCategory)
      : sites;
    const randomIndex = Math.floor(Math.random() * filteredSites.length);
    setRandomUrl(randomIndex);
    refModal?.current?.open();
  };
  
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center">
      <div className="flex justify-start w-full absolute top-4 ">
        <img src="/logo.jpg" className="" />
      </div>

      <div className="flex flex-col gap-5 items-center justify-center h-full text-white flex-1">
        <h1>{t("title")}</h1>
        {/* <p>{t("description")}</p> */}
        <button
          onClick={() => {
            goToRandomSite();
          }}
          className="mt-6 px-4 py-2 rounded-full font-bold text-md tracking-wide transition-all duration-300 border border-pink-500 text-pink-500 bg-black/30 backdrop-blur-sm hover:bg-pink-500 hover:text-black shadow-[0_0_10px_#ff00ff]"
        >
          {t("randomLocation")}
        </button>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-2 rounded-full font-bold text-md tracking-wide transition-all duration-300 border border-pink-500 text-pink-500 bg-black/30 backdrop-blur-sm hover:bg-pink-500 hover:text-black shadow-[0_0_10px_#ff00ff]"
            >
              {category}
            </button>
          ))}
        </div>

        <CustomModalExample ref={refModal}>
          <div className="text-center space-y-4 pb-4">
            {/* عنوان الموقع */}
            <h2 className="text-3xl font-orbitron text-neonPink drop-shadow-[0_0_10px_#ff00ff]">
              {randomUrl !== undefined && sites[randomUrl].title}
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
        <Footer />
      </div>
    </div>
  );
}

export default Home
