import React from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { LuUsers } from "react-icons/lu";
import { AiTwotoneShop } from "react-icons/ai";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiWarning , CiSettings } from "react-icons/ci";
import "../css/sidebar.css";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebarLogoHolder'>
                <img src="/admin/logo.png" alt="" />    
                <div className='logoText'>
                    <p style={{fontSize:20, fontWeight:700}}>FEASTSYNC</p>
                    <p style={{fontSize:13, fontWeight:400, color:'#C4B5FD'}}>ADMIN</p>
                </div>
            </div>
            <div className='adminDashboardLayout'>
                <section className='adminDashboardWrapper'>
                    <TbLayoutDashboardFilled />
                    <p>Dashboard</p>
                </section> 
                <section className='adminDashboardWrapper'>
                    <LuUsers />
                    <p>Users</p>
                </section>
                <section className='adminDashboardWrapper'>
                    <AiTwotoneShop />
                    <p>Vendors</p>
                </section>
                <section className='adminDashboardWrapper'>
                    <RiVerifiedBadgeLine />
                    <p>Verification</p>
                </section>
                <section className='adminDashboardWrapper'>
                    <MdOutlinePayment />
                    <p>Payments</p>
                </section>
                <section className='adminDashboardWrapper'>
                    <CiWarning />
                    <p>Disputes</p>
                </section>
                <section className='adminDashboardWrapper'>
                    <CiSettings />
                    <p>settings</p>
                </section>
            </div>
        </div>
    )
}

export default Sidebar
