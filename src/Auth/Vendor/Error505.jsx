import React from 'react'
import "../Vendor/onBoardingFiles/css/Error404.css"
import Header from '../../Components/Header';
import { FaArrowRight } from "react-icons/fa6";
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';

const Error505 = () => {
  const navigate = useNavigate();
  return (
    <div className='error505Container'>
      <Header />
      <div className='error505'>
        <img src="/error/rafiki.png" alt="" />
        <p>We are working towards making something better, won't be long.....</p>
        <span className="errorBtn" onClick={() => navigate('/')}>
          <p>Go back to home</p>
          <FaArrowRight />
        </span>
      </div>
      <Footer />
    </div>
  )
}

export default Error505