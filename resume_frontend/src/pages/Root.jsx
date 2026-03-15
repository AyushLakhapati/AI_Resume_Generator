import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function Root() {
  return (
    <div className="global-bg">
      <div className="global-overlay min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
