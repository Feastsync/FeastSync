import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const AdminLayoutHeader = () => {
  return (
    <header className='admindashboardHeader'>
       <div className='adminDashboardInput'>
                     <div className='adminDashboardInputholder'>
                       <input type="text" placeholder='search users vendors booking transaction...'/>
                     </div>
                      <div className='adminDashboardNotification'>
                          <p className='adminDashboardNotificationlogo'><IoMdNotificationsOutline /></p>
                          <div className='adminDashboardlogo'>
                              <p>AT</p>
                          </div>
                              <div className='adminDashboardName'>
                                  <div className='adminDashboardTitle'>
                                  <p className='adminDashboardFullname'>Adeoluwa Taiwo</p>
                                  <p>admin@feastsync.ng</p>
                                 </div>
                                    <p><RiArrowDropDownLine /></p>
                             </div>
                            </div>
                         
                  </div>
    </header>
  )
}

export default AdminLayoutHeader
