import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import logo from '../../assets/frontend_assets/logo.png'   // ✅ ADD THIS LINE

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          
          {/* ✅ LOGO FIXED */}
          <img src={logo} alt="Foodyra" className="footer-logo" />

          <p>© 2024 Food Delivery App. All rights reserved.</p>

          <div className="footer-social-icons">
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
          </div>

        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <ul>
            <li>+91-8652046450</li>
            <li>contact@fooddeliveryapp.com</li>
          </ul>
        </div>

      </div>

      <hr/>

      <p className='footer-copyright'>
        © 2024 Food Delivery App. All rights reserved.
      </p>
    </div>
  )
}

export default Footer