import React from 'react'
import HomeHero from '../Components/HomeComponents/HomeHero'
import FeaturedVendors from '../Components/HomeComponents/FeaturedVendors'
import HowItWorks from '../Components/HomeComponents/HowItWork'
import WhatWeStandFor from '../Components/HomeComponents/WhatWeStandFor'
import Footer from '../Components/Footer'
import Readytogetstarted from '../Components/Readytogetstarted'

const Home = () => {
  return (
    <div>
      <HomeHero/>
      <FeaturedVendors/>
      <HowItWorks/>
      <WhatWeStandFor/>
      <Readytogetstarted/>
      <Footer/>
    </div>
  )
}

export default Home
