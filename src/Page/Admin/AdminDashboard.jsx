import React from 'react'
import "./css/AdminDashboard.css";
import { Button } from 'antd';
import AdmindashboardReview from './component/AdmindashboardReview';
import AdminDashboardRevenue from './component/AdminDashboardRevenue';
import AdminDashboardVerification from '../Admin/component/AdminDashboardVerification';
import { FaArrowTrendUp } from "react-icons/fa6";


const AdminDashboard = () => {
  return (
    <div className='adminDashboardContainer'>
        <AdmindashboardReview />
        <AdminDashboardRevenue />
        <AdminDashboardVerification />
    </div>
  )
}

export default AdminDashboard
