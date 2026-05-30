import React from 'react'
import Howitworks from "./Page/Howitworks.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Howitworks />} />
        <Route path="/howitworks" element={<Howitworks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App