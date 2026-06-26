import React from 'react'
import Header from '../../Components/Header';
import { FaArrowRight } from "react-icons/fa6";
import Footer from '../../Components/Footer';
import "../Vendor/onBoardingFiles/css/Error.css"
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className='errorContainer'>
      {/* <Header /> */}
      <div className='error'>
        <img src="/error/pana.png" alt="" />
        <p>Mic check one-two. We can't find that page</p>
        <button className="errorBtn" onClick={() => navigate('/')}>
          <span>Go back to home</span>
          <FaArrowRight />
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Error404