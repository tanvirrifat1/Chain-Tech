import { Outlet } from "react-router-dom";

const Main = () => {
  //   const location = useLocation();

  //   const noHeaderFooter =
  //     location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="bg-white text-black">
      {/* {noHeaderFooter || <Navbar />} */}
      <Outlet />
      {/* {noHeaderFooter || <Footer />} */}
    </div>
  );
};

export default Main;
