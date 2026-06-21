import React from 'react'
import "./css/AdminDashboard.css";
import { Button } from 'antd';
import AdmindashboardReview from './component/AdmindashboardReview';
import AdminDashboardRevenue from './component/AdminDashboardRevenue';
import AdminDashboardVerification from './component/AdminDashboardVerification';
import { FaArrowTrendUp } from "react-icons/fa6";


const AdminDashboard = () => {
  return (
    <div className='adminDashboardholder'>
      {/* <div className='adminDashboardContainer'>
        <div className='adminDashboardRight'>
            <div>
          <div className='adminDashBoardDiv'>
                <AdmindashboardReview />
              <AdminDashboardRevenue />
              <AdminDashboardVerification />
            </div>   
            </div>
        </div>
       </div> */}
    </div>
  )
}

export default AdminDashboard
