
import React from 'react'
import Header from '../../Components/Header';
import { FaArrowRight } from "react-icons/fa6";
import Footer from '../../Components/Footer';
import"../Vendor/onBoardingFiles/css/Error.css"
const Error505 = () => {
  return (
    <div className='errorContainer'>
      <Header />
      <div className='error'>
        <img src="public/error/pana.png" alt="" />
        <p>Mic check one-two.We can't find that page</p>
          <span className="errorBtn">
                  <p>Go back to home</p>
                 <p> <FaArrowRight /></p>
                </span>
      </div>
      <Footer />
    </div>
  )
}

export default Error505
