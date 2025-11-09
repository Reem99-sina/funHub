import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import sites from "./data/sites_300_en.json";
import { CustomModalExample, type ModalRef } from "./component/model";
import Footer from "./component/footer";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./component/pages/home";
import Privacy from "./component/pages/privacy";
import Header from "./component/header";

// const sites = [
//   "https://www.duolingo.com",
//   "https://www.boredpanda.com",
//   "https://www.puzzleprime.com",
//   "https://www.coolmathgames.com",
//   "https://www.theonion.com",
// ];

function App() {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy/>} />
        <Route path="/terms" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/about" element={<></>} />
        <Route path="/best-sites" element={<></>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
