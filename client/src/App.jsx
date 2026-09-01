import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/MyFooter";

const App = () => {
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="min-h-screen pt-[76px] sm:pt-[84px]">
        <div
          key={location.pathname}
          className="page-enter"
        >
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;