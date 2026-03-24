import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets";
import logo from "../../assets/frontend_assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx"; // ✅ FIXED IMPORT


const Navbar = ({ setShowLoginPopup }) => {

  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const scrollToSection = (id, menuName) => {
    setMenu(menuName);

    const element = document.getElementById(id);

    if (element) {
      const yOffset = -10;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className='navbar'>

      {/* ✅ UPDATED LOGO */}
      <Link to='/'>
        <img src={logo} alt='Foodyra' className='logo' />
      </Link>

      <ul className='navbar-menu'>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <li
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
        </Link>

        <li
          onClick={() => scrollToSection("explore-menu", "Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>

        <li
          onClick={() => scrollToSection("app-download", "Mobile App")}
          className={menu === "Mobile App" ? "active" : ""}
        >
          Mobile App
        </li>

        <li
          onClick={() => scrollToSection("footer", "Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </li>

      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt='search' />

        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='basket' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token || token === "" ? (
          <button onClick={() => setShowLoginPopup(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'> 
            <img src={assets.profile_icon} alt=""/>

            <ul className='navbar-profile-dropdown'>
              
              {/* Orders */}
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders"/>
                <span>Orders</span>
              </li>

              <hr/>

              {/* Logout */}
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout"/>
                <span>Logout</span>
              </li>

            </ul>

          </div>
        )}

      </div>

    </div>
  );  
};

export default Navbar;