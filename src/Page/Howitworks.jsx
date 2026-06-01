import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Howitworkshost from '../Components/HowitWorksComponents/Howitworkshost'
import Howitworksescrow from '../Components/HowitWorksComponents/Howitworksescrow'
import Howitworksvendor from '../Components/HowitWorksComponents/Howitworksvendor'

const Howitworks = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Howitworkshost />} />
        <Route path="howitworksescrow" element={<Howitworksescrow />} />
        <Route path="howitworksvendor" element={<Howitworksvendor />} />
      </Routes>
    </div>
  )
}

export default Howitworks