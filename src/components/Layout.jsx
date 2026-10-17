import { Outlet } from "react-router";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="main-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
