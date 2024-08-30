// src/App.tsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import About from "./components/About";
import Example from "./components/Example";
import Whisper from "./components/Whisper";

const App: React.FC = () => {
  useEffect(() => {
    // 初始化 adsbygoogle，只在第一次掛載時執行
    const loadAds = () => {
      if (window.adsbygoogle) {
        try {
          window.adsbygoogle.push({});
        } catch (e) {
          console.error("Adsbygoogle error:", e);
        }
      }
    };

    loadAds();

    return () => {
      // Optional: 清理函式，例如重置 adsbygoogle 狀態
      const ads = document.querySelectorAll(".adsbygoogle");
      ads.forEach((ad) => ad.remove());
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7491649138626528"
            crossOrigin="anonymous"
          ></script>
        </Helmet>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/example" element={<Example />} />
            <Route path="/whisper" element={<Whisper />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
