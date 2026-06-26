import { current } from "@reduxjs/toolkit"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"

const AdmindashboardReview = () => {
  const adminDashboard =[
    {
        icon:"/admin/icons/overviewIcons/naira.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
         icon:"/admin/icons/overviewIcons/increment.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
        icon:"/admin/icons/overviewIcons/calendar.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
          icon:"/admin/icons/overviewIcons/naira.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
         icon:"/admin/icons/overviewIcons/cancel.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
          icon:"/admin/icons/overviewIcons/home.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
          icon:"/admin/icons/overviewIcons/people.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
          icon:"/admin/icons/overviewIcons/clock.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
           icon:"/admin/icons/overviewIcons/warning.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },

     {
          icon:"/admin/icons/overviewIcons/naira.png",
        previousValue:10,
        currentValue:20,
        label:"Total Revenue"
    },
]
  return (
    <div className='adminDashboardReview'>
      <p style={{fontWeight: 800, fontSize: 20}}>Dashboard overview</p>
      <p style={{color:'#616161', fontWeight:400, fontSize:12}}>wednesday 11 june 2026</p>
      <div className='adminDashboardGrid'>
        {adminDashboard.map((list, index) =>(
          <div key={index} className="adminDashboardReviewCard">
            <div className='adminDashboardReviewCardTop'>
              <img src={list.icon} alt=""/>
              <div className={`${list.currentValue - list.previousValue > 0 ? 'positiveStat': 'negativestat'} adminStats`}>
                {(list.currentValue - list.previousValue > 0 ? <FaArrowTrendUp size={12} /> : <FaArrowTrendDown size={10} color="#eb1b1b" />)}
                <p>{list.currentValue - list.previousValue}</p>
              </div>
            </div>
            <p className='adminDashboardNaira'>&#x20A6;{list.currentValue}</p>
            <p style={{color:'#6B6880',fontSize:14}}>{list.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdmindashboardReview
