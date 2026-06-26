import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import '../css/header.css'

const AdminLayoutHeader = () => {
  return (
    <header className='adminHeader'>
      <input type="text" placeholder='search users vendors booking transaction...'/>
      <div className='adminInfo'>
        <IoMdNotificationsOutline size={29}/>
        <div className='adminInitials'>
          <p>AT</p>
        </div>
        <div className='adminNameContainer'>
          <div className='adminNameContainerInner'>
            <p style={{fontSize:16, fontWeight:700,}}>Adeoluwa Taiwo</p>
            <p style={{fontSize:11, color:"#6B6880",fontWeight:600}}>admin@feastsync.ng</p>
          </div>
          <RiArrowDropDownLine size={14}/>
        </div>
      </div>
    </header>
  )
}

export default AdminLayoutHeader
