import { Outlet, useLocation } from "react-router-dom";
import Header from "../Navbar/Navbar";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="bg-white text-black ">
      {noHeaderFooter || <Header />}
      <Outlet />
      {/* {noHeaderFooter || <Footer />} */}
    </div>
  );
};

export default Main;
