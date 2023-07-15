import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? 
  <>
    <Nav />
    <Outlet />
    <Footer />
  </>
   : <Navigate to="/login" />;
};

export default PrivateComponent;
