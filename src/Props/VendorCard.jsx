import React, { useState } from 'react'
import Button from './Button'
import { IoLocationOutline } from 'react-icons/io5'
import { FaStar, FaHeart } from 'react-icons/fa' 
import { FiHeart } from 'react-icons/fi'
import "./Css/VendorsCard.css"

const VendorCard = (props) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="vendor_card">
      
      <div className="card_top_actions">
        <span className="see_more_lnk">See More</span>
        <Button 
          className="wishlist_btn" 
          onClick={handleLikeClick} 
          btnText={
            isLiked ? (
              <FaHeart size={16} color="#000000" /> 
            ) : (
              <FiHeart size={16} /> 
            )
          } 
        />
      </div>

      <div className="vendor_img_box">
        <img src={props.image} alt={props.name} className="vendor_img" />
      </div>

      <div className="vendor_info">
        <h3 className="vendor_name">{props.name}</h3>
        
        <div className="vendor_location">
          <IoLocationOutline size={16} />
          <span>{props.location}</span>
        </div>

        <div className="vendor_rating">
          {[...Array(5)].map((_, index) => (
            <FaStar 
              key={index} 
              size={14} 
              color={index < props.rating ? "#000000" : "#e0e0e0"} 
            />
          ))}
        </div>

        <div className="vendor_card_footer">
          <div className="price_box">
            <p className="price_lbl">Starting Price</p>
            <p className="price_amt">₦{props.price ? props.price.toLocaleString() : 0}</p>
          </div>
          <Button className="btn_purple" btnText="Book now" />
        </div>

      </div>
    </div>
  )
}

export default VendorCard