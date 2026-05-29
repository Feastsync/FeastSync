import React from 'react'
import Header from "./Components/Header.jsx"
import Howitworks from "./Page/Howitworks.jsx"add
import { HashRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="howitworks" element={<Howitworks />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
