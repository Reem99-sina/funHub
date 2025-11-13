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
import Papa from "papaparse";

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

  
   useEffect(() => {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXG7jJEtrf5sNk3HN_-h06xnPAXqKnuTFK0t99VxQ-QKub2f06ImbwxLgqxsuEaHHQINbu2IWfsPKU/pub?gid=0&single=true&output=csv";

    fetch(url)
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        console.log(parsed.data,"parsed");
        // setSites(parsed.data);        
      });
  }, []);
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
