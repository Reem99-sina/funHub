import { useSites } from "@/context/SitesContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
import { useMemo, useState, type ReactNode } from "react";
// import type { Swiper as SwiperClass } from "swiper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Rating from "../rating";
import Pagination from "../pagination";

export default function BestSites() {
  const { sites } = useSites();
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const sitesPerPage = 30;
  const sortedSites = [...sites].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0)
  );

  const lengthData = useMemo(() => {
    return sortedSites?.length || 1;
  }, [sortedSites]);

  const currentSites = useMemo(() => {
    const start = currentPage * sitesPerPage;
    return sortedSites?.slice(start, start + sitesPerPage) || [];
  }, [sortedSites, currentPage]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="p-4 max-w-full mx-auto relative h-full text-black flex flex-col gap-3 md:px-16 ">
      <h1 className="text-3xl font-extrabold text-center text-main-color mb-8 tracking-wide">
        {t("bestSites")}
      </h1>

      {/* Custom arrows */}
      {/* <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition"
      >
        ◀
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-0 z-10 bg-blue-600 text-white px-3 py-2 rounded-full -translate-y-1/2 hover:bg-blue-700 transition"
      >
        ▶
      </button> */}

      {/* <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={25}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ width: "100%" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {sortedSites.map((site, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer"
            onClick={() => navigate(`/view/${index}`)}
          >
            <div className="text-black bg-white shadow-lg hover:shadow-lg transition p-2 flex flex-col">
              <h2 className="font-semibold mb-2 text-center">{site.name}</h2>

              <div className="flex justify-center pb-2">
                <Rating siteIndex={index} />
              </div>
              <p className="text-sm mb-2">
                {i18n.language === "en"
                  ? site.description_en
                  : site.description_ar}
              </p>

              <div className="flex-1 border mt-2">
                <iframe
                  src={site.url}
                  title={site.name}
                  className="w-full h-64 rounded"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {currentSites.map((site, index) => (
          <Card
            iframe={
              <iframe
                src={site.url}
                title={i18n.language == "ar" ? site?.name_ar : site?.name_en}
                className="w-full h-64 rounded"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            }
            title={i18n.language == "ar" ? site?.name_ar : site?.name_en}
            desc={
              i18n.language == "ar" ? site.description_ar : site?.description_en
            }
            rating={site.rating || 0}
            siteIndex={index}
            key={index}
          />
        ))}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        pageCount={Math.ceil(lengthData / sitesPerPage)}
        initialPage={1}
      />
    </div>
  );
}
interface CardProps {
  iframe: ReactNode;
  title: string;
  rating?: number; // optional, default to 0
  desc: string;
  siteIndex: number;
}

export const Card = ({ iframe, title, desc, siteIndex }: CardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer card bg-linear-to-br from-red-100 via-red-50 to-red-100 shadow-2xl hover:shadow-red-300 transition-all duration-300 transform hover:scale-[1.03] text-black rounded-3xl border border-red-200"
      onClick={() => navigate(`/view/${siteIndex}`)}
    >
      <figure className="h-48 overflow-hidden rounded-t-3xl">{iframe}</figure>

      <div className="card-body px-6 py-4">
        <h2 className="text-xl font-bold text-main-color mb-2 leading-snug tracking-wide">
          {title}
        </h2>

        <p className="text-sm md:text-base text-black leading-snug font-medium mt-1">
          {desc}
        </p>

        <div className="flex justify-center items-center mt-auto">
          <div className="flex items-center gap-1 text-yellow-500">
            <Rating siteIndex={siteIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};
