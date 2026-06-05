import React from 'react'
import Button from '../Props/Button'
import "./Css/Readytogetstarted.css"
import { useNavigate } from 'react-router-dom'

const Readytogetstarted = () => {
  const Nav = useNavigate()
  return (
    <section className='hero-getStarted'>
      <article className='hero-getStarted-wrapper' >
      <h3>Ready to get started?</h3>
      <h1>Your next great event begins here.</h1>
      <p>Whether you are planning an event or ready to list your talent <span> — FeastSync </span> is built for you.</p>
      </article>
      <div className='hero-getStarted-btn-container'>
        <Button onClick={() => Nav("/onboarding")} className="hero-getStarted-btn1" btnText="Get Started" />
        <Button onClick={() => Nav("/vendors")} className="hero-getStarted-btn2" btnText="Explore Vendors" />
      </div>
    
    </section>
  )
}

export default Readytogetstarted
