import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../Components/Header"

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout