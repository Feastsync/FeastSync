import React from 'react'
import "../css/AdminDashboard.css";
import  Button from "../../../Props/Button";

const AdminDashboardRevenue = () => {
  return (
    <div className='adminRevenueHolder'>
      <div className='adminRevenueContainer'>
        <section className='adminRevenueSection'>
            <div className='adminRevenueText'>
                <p className='adminRevenue'>Revenue analytics</p>
                <p>This week in &#x20A6; million</p>
            </div>
            <div className='adminRevenueButton'>
                <Button className='adminBtn'>Daily</Button>
                <Button className='adminBtn'>Weekly</Button>
                <Button className='adminBtn'>Monthly</Button>
            </div>
        </section>
         <section className='adminRevenueImage'>
            <img src="public/admin/Frame.png" alt="" />
         </section>
      </div>

            <div className='adminRevenueContain'>
        <section className='adminRevenueSection'>
            <div className='adminRevenueText'>
                <p className='adminRevenue'>Revenue analytics</p>
                <p>This week in &#x20A6; million</p>
            </div>
        </section>
         <section className='adminRevenueImage'>
            <img src="public/admin/BarChart.png" alt="" />
         </section>
      </div>
    </div>
  )
}

export default AdminDashboardRevenue
