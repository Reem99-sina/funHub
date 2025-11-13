import { useEffect } from "react";
import "./App.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import Footer from "./component/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/pages/home";
import Privacy from "./component/pages/privacy";
import Header from "./component/header";
import About from "./component/pages/about";
import WebsiteViewer from "./component/pages/WebsiteViewer";
import BestSites from "./component/pages/best-sites";
import ContactUs from "./component/pages/contact";

// const sites = [
//   "https://www.duolingo.com",
//   "https://www.boredpanda.com",
//   "https://www.puzzleprime.com",
//   "https://www.coolmathgames.com",
//   "https://www.theonion.com",
// ];

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    // غيّر اتجاه الصفحة بناءً على اللغة
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [i18n.language]);
  const hideFooter = location.pathname.includes("view");
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center w-full relative ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/best-sites" element={<BestSites />} />
          <Route path="/view/:siteIndex" element={<WebsiteViewer />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
