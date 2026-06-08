import React from 'react'
import "./Css/Footer.css"
import Headerlogo from '../assets/logos/Headerlogo.png'

const Footer = () => {
  return (
    <footer className="footer_sec">
      <div className="footer_container">
        <div className="footer_brand">
          <img src={Headerlogo} alt="FeastSync Logo" className="footer_logo" />
          <span className="footer_brand_name">FEASTSYNC</span>
        </div>


        <div className="footer_links">

          <div className="footer_col">
            <h4 className="footer_col_title">LEGAL</h4>
            <a href="#privacy" className="footer_link">Privacy Policy</a>
            <a href="#terms" className="footer_link">Terms & Conditions</a>
            <a href="#escrow" className="footer_link">Escrow Policy</a>
            <a href="#guidelines" className="footer_link">Community Guideline</a>
            <a href="#cookies" className="footer_link">Cookies Policy</a>
          </div>

          <div className="footer_col  footer_col1">
            <h4 className="footer_col_title">Company</h4>
            <a href="#about" className="footer_link">About</a>
            <a href="#careers" className="footer_link">Careers</a>
            <a href="#contact" className="footer_link">Contact</a>
            <a href="#blog" className="footer_link">Blog</a>
          </div>

          <div className="footer_col">
            <h4 className="footer_col_title">Services</h4>
            <a href="#djs" className="footer_link">DJs</a>
            <a href="#mcs" className="footer_link">MCs</a>
            <a href="#bands" className="footer_link">Live Bands</a>
            <a href="#photographer" className="footer_link">Photographer</a>
            <a href="#videographer" className="footer_link">Videographer</a>
          </div>

          <div className="footer_col">
            <h4 className="footer_col_title">Support</h4>
            <a href="#help" className="footer_link">Help Center</a>
            <a href="#faqs" className="footer_link">FAQs</a>
            <a href="#refund" className="footer_link">Refund Policy</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
