import React from 'react'
import Header from "./Components/Header.jsx"
import Howitworks from "./Page/Howitworks.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Howitworks />} />
        <Route path="/howitworks" element={<Howitworks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App