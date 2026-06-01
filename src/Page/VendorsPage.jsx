// VendorsPage.jsx
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Css/VendorsPage.css'

const categories = [
  { label: 'All', path: '/vendors' },
  { label: 'DJs', path: '/vendors/djs' },
  { label: 'MCs', path: '/vendors/mcs' },
  { label: 'Live Bands', path: '/vendors/livebands' },
  { label: 'Photography', path: '/vendors/photography' },
  { label: 'Videography', path: '/vendors/videography' },
]

const VendorsPage = () => {
  return (
    <div>
      <div className="filter-bar">
        {categories.map((i) => (
          <NavLink
            key={i.path}
            to={i.path}
            end={i.path === '/vendors'}
            className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}
          >
            {i.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export default VendorsPage