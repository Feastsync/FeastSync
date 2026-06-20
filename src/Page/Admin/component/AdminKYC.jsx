import React from 'react'
import "./admincss/AdminDashboard.css";
import { Button } from 'antd';
import AdminDashBoardLeft from './component/AdminDashBoardLeft';
import AdminDashBoardHeader from './component/AdminDashBoardHeader';
import AdmindashboardReview from './component/AdmindashboardReview';
import AdminDashboardRevenue from './component/AdminDashboardRevenue';
import AdminDashboardVerification from './component/AdminDashboardVerification';

const AdminKYC = () => {
  return (
    <div>
       <div className='adminDashboardholder'>
      <div className='adminDashboardContainer'>
          <AdminDashBoardLeft />
        <div className='adminDashboardRight'>
           <AdminDashBoardHeader />
            <div>
          <div className='adminDashBoardDiv'>
                <AdmindashboardReview />
              <AdminDashboardRevenue />
              <AdminDashboardVerification /></div>   
            </div>
        </div>
       </div>
 
  
    </div>
    </div>
  )
}

export default AdminKYC
