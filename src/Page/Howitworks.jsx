import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HowItWorksHost from '../Components/HowItWorksComponents/Howitworkshost'
import Howitworksescrow from "../Components/HowItWorksComponents/Howitworksescrow"
import Howitworksvendor from "../Components/HowItWorksComponents/Howitworksvendor"

const Howitworks = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HowItWorksHost />} />
        <Route path="howitworksescrow" element={<Howitworksescrow />} />
        <Route path="howitworksvendor" element={<Howitworksvendor />} />
      </Routes>
    </div>
  )
}

export default Howitworks