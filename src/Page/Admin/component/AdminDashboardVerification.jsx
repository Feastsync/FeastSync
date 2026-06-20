import React from 'react'
import { Button } from 'antd';
import { IoFunnelOutline } from "react-icons/io5";
const AdminDashboardVerification = () => {
  return (
    <div>
       <div className='adminDashboardActivities'>
           <section className='adminDashboardButtonholder'>
            <Button className='adminDashboardButton'>All</Button>
             <Button className='adminDashboardButton'>KYC</Button>
              <Button className='adminDashboardButton'>Booking</Button>
             <Button className='adminDashboardButton'>Dispute</Button>
              <Button className='adminDashboardButton'>New user</Button>
             <Button className='adminDashboardButton'>Payment</Button>
          </section>

         <section className='adminDashboardAll'>
          <div className='adminDashboardAllHolder'>
            <p className='adminDashboardFullname'>Recent Activity</p>
            <p>5 event.showing page of 1 0f 3</p>
          </div>
          <Button><span><IoFunnelOutline /></span> filter</Button>
         </section>

         <section className='adminDashboardAll'>
          <div className='adminDashboardVarieties'>
            <div className='admindashboardAlllogo'>
              <p>DI</p>
            </div>
            <div className='admindashboardVerification'>
              <p><span>Dj incresible </span> submitted KYC document for verification</p>
              <p>2 mins ago</p>
            </div>
          </div>

         <div className='admindashboardCheckout'>
          <div className='admindashboardKyc'>
             <span>
                <img src="public/admin/Text.png" alt="" />
              </span>
              <p>
              KYC</p>
          </div>
           <div>
             <p><span><input type="checkbox" name="" id="" /></span> pending</p>
           </div>
           <img src="public/admin/Vector (3).png" alt="" />
          </div>

         </section>
         <section className='adminDashboardAll'>
          <div className='adminDashboardVarieties'>
            <div className='admindashboardAlllogo'style={{background: "#157984"}}>
              <p>DI</p>
            </div>
            <div className='admindashboardVerification'>
              <p><span>Dj incresible </span> submitted KYC document for verification</p>
              <p>2 mins ago</p>
            </div>
          </div>

         <div className='admindashboardCheckout'>
          <div className='admindashboardKyc'>
             <span>
                <img src="public/admin/Text.png" alt="" />
              </span>
              <p>
              KYC</p>
          </div>
           <div>
             <p><span><input type="checkbox" name="" id="" /></span> pending</p>
           </div>
           <img src="public/admin/Vector (3).png" alt="" />
          </div>

         </section>

         <section className='adminDashboardAll'>
          <div className='adminDashboardVarieties'>
            <div className='admindashboardAlllogo'style={{background: "green"}}>
              <p>DI</p>
            </div>
            <div className='admindashboardVerification'>
              <p><span>Dj incresible </span> submitted KYC document for verification</p>
              <p>2 mins ago</p>
            </div>
          </div>

         <div className='admindashboardCheckout'>
          <div className='admindashboardKyc'>
             <span>
                <img src="public/admin/Text.png" alt="" />
              </span>
              <p>
              KYC</p>
          </div>
           <div>
             <p><span><input type="checkbox" name="" id="" /></span> pending</p>
           </div>
           <img src="public/admin/Vector (3).png" alt="" />
          </div>

         </section>

         <section className='adminDashboardAll'>
          <div className='adminDashboardVarieties'>
            <div className='admindashboardAlllogo'style={{background: "blue"}}>
              <p>DI</p>
            </div>
            <div className='admindashboardVerification'>
              <p><span>Dj incresible </span> submitted KYC document for verification</p>
              <p>2 mins ago</p>
            </div>
          </div>

         <div className='admindashboardCheckout'>
          <div className='admindashboardKyc'>
             <span>
                <img src="public/admin/Text.png" alt="" />
              </span>
              <p>
              KYC</p>
          </div>
           <div>
             <p><span><input type="checkbox" name="" id="" /></span> pending</p>
           </div>
           <img src="public/admin/Vector (3).png" alt="" />
          </div>

         </section>

         <section className='adminDashboardAll'>
          <div className='adminDashboardVarieties'>
            <div className='admindashboardAlllogo'style={{background: "red"}}>
              <p>DI</p>
            </div>
            <div className='admindashboardVerification'>
              <p><span>Dj incresible </span> submitted KYC document for verification</p>
              <p>2 mins ago</p>
            </div>
          </div>

         <div className='admindashboardCheckout'>
          <div className='admindashboardKyc'>
             <span>
                <img src="public/admin/Vector (3).png" alt="" />
              </span>
              <p>
              KYC</p>
          </div>
           <div>
             <p><span><input type="checkbox" name="" id="" /></span> pending</p>
           </div>
           <img src="public/admin/Vector (3).png" alt="" />
          </div>
         </section>          
                 </div>
    </div>
  )
}

export default AdminDashboardVerification
