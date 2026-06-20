import React from 'react'
import { adminDashboard } from"../../../mock/dashboard"
import "../css/AdminDashboard.css";
const AdmindashboardReview = () => {
  return (
    <div>
          <div className='adminDashboardReview'>
                    <p className='adminDashboardFullname'>Dashboard overview</p>
                    <p>wednesday 11 june 2026</p>
                    <div className='adminDashboardGrid'>
                        {adminDashboard.map((list, index) =>(
                            <div key={index}>
                                <section className="adminDashboardSection">
                           <article className='adminDashboardImageWrapper'>
                             <img src={list.currency} alt="" />
                           <img src={list.increament} alt="" />
                           </article>
                           <p className='adminDashboardNaira'>&#x20A6;{list.naira}</p>
                           <p>{list.revenue}</p>
                        </section>
                            </div>
                        ))}
                        </div>
                        </div>
    </div>
  )
}

export default AdmindashboardReview
