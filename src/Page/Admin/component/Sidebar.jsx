import React from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { LuUsers } from "react-icons/lu";
import { AiTwotoneShop } from "react-icons/ai";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiWarning , CiSettings } from "react-icons/ci";
import "../css/sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const NAVLINKS = [
        { icon: <TbLayoutDashboardFilled />, label: "Dashboard", href: "/admin/dashboard" },
        { icon: <LuUsers />, label: "Users", href: "/admin/users" },
        { icon: <AiTwotoneShop />, label: "Vendors", href: "/admin/vendors" },
        { icon: <RiVerifiedBadgeLine />, label: "Verification", href: "/admin/verification" },
        { icon: <MdOutlinePayment />, label: "Payments", href: "/admin/payments" },
        { icon: <CiWarning />, label: "Disputes", href: "/admin/disputes" },
        { icon: <CiSettings />, label: "Settings", href: "/admin/settings" },
    ]
    return (
        <div className='sidebar'>
            <div className='sidebarLogoHolder'>
                <img src="/admin/logo.png" alt="" />    
                <div className='logoText'>
                    <p style={{fontSize:20, fontWeight:700}}>FEASTSYNC</p>
                    <p style={{fontSize:13, fontWeight:400, color:'#C4B5FD'}}>ADMIN</p>
                </div>
            </div>
            <div className='adminNavLinks'>
                {NAVLINKS.map((link, index) => (
                    <Link to={link.href} key={index}>
                        <section className='adminNavLinkWrapper'>
                            {link.icon}
                            <p>{link.label}</p>
                        </section>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar