import React from 'react'
import "./Css/Howitwork.css"
import Heroimage from "../assets/BackgroundImage/heroimage.jpg"

const Howitworks = () => {
  return (
    <main className='main-container'>
      <section className='hero-section'>
        <img src={Heroimage} alt="Hero" />
        <div className='overlay'></div>
        <div className='hero-content'>
          <h1>
            Secure. Transparent.
            <br />
            Seamless: How
            <br />
            FeastSync Works.
          </h1>

          <p>
            Whether you are hosting an event or performing at one,
            FeastSync is built to make the entire process transparent,
            secure, and effortless — from first click to final payout.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Howitworks