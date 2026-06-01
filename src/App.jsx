import React from 'react'
import About from './Page/About.jsx'
import Howitworks from "./Page/Howitworks.jsx"
import Services from './Page/Services.jsx'
import GetStarted from './Page/GetStarted.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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