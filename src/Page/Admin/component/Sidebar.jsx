import React, { useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { AiTwotoneShop } from "react-icons/ai";
import { RiArrowDropDownLine, RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiWarning, CiSettings } from "react-icons/ci";
import "../css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const NAVLINKS = [
    {
      icon: <TbLayoutDashboardFilled />,
      labels: "Dashboard",
      href: "/admin/dashboard",
    },
    { icon: <LuUsers />, 
      labels: "Users",
       href: "/admin/users"
       },
    {
      icon: <AiTwotoneShop />,
      labels: "Vendors",
        href: "/admin/vendors",
      isdropdown: true,
      dropdownItems: [
        { label: "All Vendors", href: "/admin/vendors/all" },
        { label: "Pending", href: "/admin/vendors/pending" },
        { label: "Approved", href: "/admin/vendors/approved" },
        { label: "Rejected", href: "/admin/vendors/rejected" },
      ],
    },
    {
      icon: <RiVerifiedBadgeLine />,
      labels: "Verification",
        href: "/admin/verify",
      isdropdown: true,
      dropdownItems: [
        { label: "All Requests", href: "/admin/verification/all" },
        { label: "Pending", href: "/admin/verification/pending" },
        { label: "Approved", href: "/admin/verification/approved" },
        { label: "Rejected", href: "/admin/verification/rejected" },
      ],
    },
    { 
        icon: <MdOutlinePayment />, 
        labels: "Payments", 
          href: "/admin/payments",
        isdropdown: true, 
        dropdownItems: [
            { label: "All Payments", href: "/admin/payments/all" },
            { label: "Pending", href: "/admin/payments/pending" },
            { label: "Completed", href: "/admin/payments/completed" },
            { label: "Failed", href: "/admin/payments/failed" },
        ]
    },
    { 
        icon: <CiWarning />, 
        labels: "Disputes", 
           href: "/admin/disputes",
        isdropdown: true, 
        dropdownItems: [
            { label: "All Disputes", href: "/admin/disputes/all" },
            { label: "Pending", href: "/admin/disputes/pending" },
            { label: "Resolved", href: "/admin/disputes/resolved" },
        ]
    },
    { icon: <CiSettings />, labels: "Settings", href: "/admin/settings" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarLogoHolder">
        <img src="/admin/logo.png" alt="" />
        <div className="logoText">
          <p style={{ fontSize: 20, fontWeight: 700 }}>FEASTSYNC</p>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#C4B5FD" }}>
            ADMIN
          </p>
        </div>
      </div>
      <div className="adminNavLinks">
        {NAVLINKS.map((link, index) => (
          <div key={index}>
            <div
              onClick={() => {
                if (link.isdropdown) {
                  setOpenDropdown(openDropdown === index ? null : index);
                } else if (link.href) {
                  navigate(link.href);
                }
              }}
              className="adminNavLink"
            >
              <section className="adminNavLinkWrapper">
        <Link to={link.href} className="adminNavLinkWrapper sidebarLink">
  {link.icon}
  <p>{link.labels}</p>
</Link>
              </section>
              {link.isdropdown && (
                <RiArrowDropDownLine
                  size={24}
                  className={openDropdown !== index ? "icon-rotate" : ""}
                />
              )}
            </div>
            {link.isdropdown &&
              openDropdown === index &&
              link.dropdownItems && (
                <div className="dropdownMenu">
                  {link.dropdownItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      onClick={() => navigate(item.href)}
                      className="dropdownItem"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
