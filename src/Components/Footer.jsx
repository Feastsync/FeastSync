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
            <a className="footer_link">Privacy Policy</a>
            <a className="footer_link">Terms & Conditions</a>
            <a className="footer_link">Escrow Policy</a>
            <a className="footer_link">Community Guideline</a>
            <a className="footer_link">Cookies Policy</a>
          </div>

          <div className="footer_col">
            <h4 className="footer_col_title">Company</h4>
            <a className="footer_link">About</a>
            <a className="footer_link">Careers</a>
            <a className="footer_link">Contact</a>
            <a className="footer_link">Blog</a>
          </div>

          <div className="footer_col">
            <h4 className="footer_col_title">Services</h4>
            <a className="footer_link">DJs</a>
            <a className="footer_link">MCs</a>
            <a className="footer_link">Live Bands</a>
            <a className="footer_link">Photographer</a>
            <a className="footer_link">Videographer</a>
          </div>

          <div className="footer_col">
            <h4 className="footer_col_title">Support</h4>
            <a className="footer_link">Help Center</a>
            <a className="footer_link">FAQs</a>
            <a className="footer_link">Refund Policy</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer