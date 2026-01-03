import React, { useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Home/Coin/Coin";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Features from "./components/Features";
import Signup from "./components/Signup";
import Login from "./components/Login";
import BlogDetail from "./components/BlogDetail";
import AOS from "aos";
import "aos/dist/aos.css";
import { CoinContext } from "./context/CoinContext";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { isLoading } = useContext(CoinContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="app">
      {/* Loading Spinner - will show when isLoading is true */}
      {isLoading && <LoadingSpinner />}
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/features" element={<Features />} />
        <Route path="/callback" element={<Callback />} />
        {/* Add these routes if you're using them */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;