import React from 'react'
import { Button } from 'antd';
import { IoFunnelOutline } from "react-icons/io5";
import { dashboardAll, dashboardDispute } from '../../../mock/moc';
import "../css/AdminDashboard.css";
import { useState, useEffect } from 'react';
  const AdminDashboardVerification = () => {
  const [dashboardCategory, setDashboardCategory] = useState([])
  const [items, setItems] = useState ('')
  const [selectedCategory, setSelectedCategory] = useState(dashboardAll)
  const [isNewUserView, setIsNewUserView] = useState(false);

    useEffect(()=>{
    const newCategories = dashboardAll.map((cart)=>cart.dashBoardButton)
    setDashboardCategory(prev=>[...new Set([...prev, ...newCategories])])
  },[dashboardAll])

const logoColors = [
  "#160628",
  "#6D28D9",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6"
];
 

const handleAllHolder = () => {
  setSelectedCategory(dashboardDispute);
  setIsNewUserView(true);
};

const handleAll = () => {
  setSelectedCategory(dashboardAll);
  setIsNewUserView(false);
};

const handleCategories = (item) => {
  setItems(item);
  const selected = dashboardAll.filter(
    (list) => list.dashBoardButton === item
  );
  setSelectedCategory(selected);
  setIsNewUserView(false);
};

  
  return (
    <div>
       <div className='adminDashboardActivities'>
  
           <section className='adminDashboardButtonholder'>
  <span>
    <Button onClick={handleAll}>All</Button>
  </span>

  {dashboardCategory.map((Category, index) => (
    <React.Fragment key={index}>
      {Category === "Payment" && (
        <span>
          <Button onClick={handleAllHolder}>New User</Button>
        </span>
      )}

      <div className='adminDashboardButton'>
        <Button onClick={() => handleCategories(Category)}>
          {Category}
        </Button>
      </div>
    </React.Fragment>
  ))}
</section>
          
          
         <section className='adminDashboardAllWrapper'>
          <div className='adminDashboardAllHolder'>
            <p className='adminDashboardFullname'>Recent Activity</p>
            <p>5 event.showing page of 1 0f 3</p>
          </div>
          <Button><span><IoFunnelOutline /></span> filter</Button>
         </section>

         <section className='adminDashboardAll'>
         {
          selectedCategory.map((list, index)=>(
          <div className={`adminDashboardAllBox ${isNewUserView ? "no-border" : "" }`}>
         {
  isNewUserView ? (
    <div className="newUserContent">
      <img
        src={list.disputImage}
        alt=""
        className="disputeImage"
      />
      <p className="disputeText">{list.disputeText}</p>
    </div>
  ) : (
    <>
      <div className='adminDashboardVarieties'>
        <div className='admindashboardAlllogo'   
        style={{
    backgroundColor: logoColors[index % logoColors.length]
  }}>
          <p>{list.logo}</p>
        </div>

        <div className='admindashboardVerification'>
          <p>
            <span>{list.allSpan}</span>
            {list.verificationText}
          </p>
          <p>{list.time}</p>
        </div>
      </div>

      <div className='admindashboardCheckout'>
        <div className='admindashboardKyc'>
          <span>
            <img src={list.vectorImage} alt="" />
          </span>
          <p>{list.verificationKYC}</p>
        </div>

        <div>
          <p>
            <span>
              <input type="checkbox" />
            </span>
            {list.verificationSpan}
          </p>
        </div>

        <img src={list.vectorImage} alt="" />

        <div className='disputeHolder'>
          <img
            src={list.disputImage}
            alt=""
            className='disputeImage'
          />
          <p className='disputeText'>
            {list.disputeText}
          </p>
        </div>
      </div>
    </>
  )
}
          </div>
          ))
         }
        
         </section>        
    </div>
    </div>
  )
}

export default AdminDashboardVerification
