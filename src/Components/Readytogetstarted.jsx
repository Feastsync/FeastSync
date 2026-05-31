import React from 'react'
import Button from '../Props/Button'
import "./Css/Readytogetstarted.css"

const Readytogetstarted = () => {
  return (
    <section className='hero-getStarted'>
      <article className='hero-getStarted-wrapper' >
      <h3>Ready to get started?</h3>
      <h1>Your next great event begins here.</h1>
      <p>Whether you are planning an event or ready to list your talent <span> — FeastSync </span> is built for you.</p>
      </article>
      {/* Uncommented and named wrapper div */}
      <div className='hero-getStarted-btn-container'>
        <Button className="hero-getStarted-btn1" btnText="Get Started" />
        <Button className="hero-getStarted-btn2" btnText="Explore Vendors" />
      </div>
      
      {/* </article> */}
    </section>
  )
}

export default Readytogetstarted
