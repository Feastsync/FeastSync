import React from 'react'
import Howitworkshost from "./Page/Howitworkshost.jsx"
import Howitworkshostvendor from './Page/Howitworksvendor.jsx'
import Howitworksescrow from "./Page/Howitworksescrow.jsx"
import Contact from "./Page/Contact.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Howitworkshost />} />
        <Route path="/howitworks" element={<Howitworkshost />} />
        <Route  path='/howitworksvendor' element={<Howitworkshostvendor />} />
        <Route path='/howitworksescrow' element={<Howitworksescrow />} />
        <Route path='contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App