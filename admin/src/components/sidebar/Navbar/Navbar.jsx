import React from "react";
import "./Navbar.css";
import { assets } from "../../../assets/assets";
import logo from "../../../assets/foodyra_admin.png";   // ✅ NEW LOGO

const Navbar = () => {
  return (
    <div className="navbar">

      {/* ✅ FOODYRA ADMIN LOGO */}
      <img className="logo" src={logo} alt="Foodyra Admin" />

      {/* Profile icon */}
      <img className="profile" src={assets.profile_image} alt="" />

    </div>
  );
};

export default Navbar;