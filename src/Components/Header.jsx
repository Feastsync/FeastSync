import React from 'react'
import "./Css/Header.css"
import Headerlogo from "../assets/Headerlogo.png"
import Button from "./Button.jsx"

const Header = () => {
  return (
    <main className='header-container'>
        <section className='header-wrapper'>
        <section className='header-left'>
            <img src={Headerlogo} alt="" />
            <h2>FeastSync</h2>
        </section>
        <section className='header-middle'>
            <h2>Home</h2>
            <h2>About</h2>
            <h2>How it works</h2>
            <h2>Vendors</h2>
            <h2>Services</h2>
            <h2>Contact</h2>
        </section>
        <section className='header-right'>
            <h2>Login</h2>
            <Button btnText="Get Started"  className="header-rightbtn"/>
        </section>
        </section>
    </main>
  )
}

export default Header
