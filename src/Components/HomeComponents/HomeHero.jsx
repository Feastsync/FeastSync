import React, { useState } from 'react'
import Imp from '../../Props/Imp'
import Button from '../../Props/Button'
import { LuSearch } from 'react-icons/lu'
import "./Css/HomeHero.css"
import {useNavigate} from 'react-router-dom'
const HomeHero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  return (
    <section className="home_hero_container">
      <div className="home_hero_overlay"></div>
      
      <div className="home_hero_content">
        <h1 className="home_hero_title">
          Elevate your groove <br /> sync with your vendors
        </h1>
        
        <p className="home_hero_desc">
          Connect with Nigeria’s elite entertainers, syncing your vision with handpicked <br /> professional vendors that keep the energy alive from start to finish.
        </p>

        <div className="home_hero_search_box">
          <Imp 
            type="text"
            placeholder="search all vendors"
            className="hero_input_txt"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<LuSearch size={15} color="#333333" />}
          />
        </div>

        <div className="home_hero_actions">
          <Button onClick={() => navigate('/onboarding')} className="btn_purple" btnText="Get Started" />
          <Button onClick={() => navigate('/vendors')}  className="btn_outline" btnText="Explore the vendors" />
        </div>
      </div>

      <div className="hero_banner_row">
        <div className="hero_banner_left">
          <p>Become a featured Feaster</p>
        </div>
        
        <div className="hero_banner_right">
          <p>Subscribe <span>➔</span></p>
        </div>
      </div>
    </section>
  )
}

export default HomeHero