import React from 'react'
import Contact from "./Page/Contact.jsx"
import About from './Page/About.jsx'
import Howitworks from "./Page/Howitworks.jsx"
import Services from './Page/Services.jsx'
import GetStarted from './Page/GetStarted.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Howitworks from "./Page/Howitworks.jsx"
import Layout from "./Page/Layout.jsx"
import Home from './Page/Home.jsx'
import VendorsPage from './Page/VendorsPage.jsx'
import AllVendors from './Components/VendorsComponents/All.jsx'
import DJs from './Components/VendorsComponents/DJs.jsx'
import MCs from './Components/VendorsComponents/MCs.jsx'
import LiveBands from './Components/VendorsComponents/LiveBands.jsx'
import Photography from "./Components/VendorsComponents/Photographty.jsx"
import Videography from './Components/VendorsComponents/Videography.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/howitworks/*" element={<Howitworks />} />     
          <Route path="/vendors" element={<VendorsPage />}>
            <Route index element={<AllVendors />} />
            <Route path="djs" element={<DJs />} />
            <Route path="mcs" element={<MCs />} />
            <Route path="livebands" element={<LiveBands />} />
            <Route path="photography" element={<Photography />} />
            <Route path="videography" element={<Videography />} />
          </Route>
        </Route>
        <Route path="/" element={<Howitworks />} />
        <Route path='/about' element={<About />}/>
        <Route path="/howitworks" element={<Howitworks />} />
        <Route path='/services' element={<Services />} />
        <Route path="/getStarted" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App