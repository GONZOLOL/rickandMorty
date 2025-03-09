import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";

const App: React.FC = () => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/characters" ||
      location.pathname === "/episodes" ||
      location.pathname === "/locations"
    ) {
      setShowNavBar(true);
    } else {
      setShowNavBar(false);
    }
  }, [location.pathname]);

  return (
    <>
      {showNavBar && <NavBar />}
      <div style={{ paddingTop: showNavBar ? "60px" : "0" }}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
