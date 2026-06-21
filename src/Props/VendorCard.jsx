import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { IoLocationOutline } from 'react-icons/io5'
import { FaStar, FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import "./Css/VendorsCard.css"

const VendorCard = (props) => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const { isLoggedIn, accountType } = useSelector((state) => state.auth)
  const isLoggedInUser = isLoggedIn && accountType === 'user'

// const handleProtectedNav = (targetPath) => {
//   if (!isLoggedInUser) {
//     navigate("/vendordashboard", { state: { from: targetPath } })
//     return
//   }
//   navigate(targetPath)
// }

const handleBookNow = (e) => {
  e.stopPropagation()
  if (!isLoggedIn) {
    navigate("/onboarding", { state: { from: `/vendor/${props.slug}` } })
    return
  }
  navigate(`/vendor/${props.slug}`) 
}

const handleWishlist = (e) => {
  e.stopPropagation()
  if (!isLoggedInUser) {
    navigate("/vendordashboard", { state: { from: `/vendor/${props.slug}` } })
    return
  } 
  setIsLiked(!isLiked)
}

 const goToVendor = () => {
  if (!props.slug) return
  navigate(`/vendor/${props.slug}`) 
}

  // const handleWishlist = (e) => {
  //   e.stopPropagation()
  //   if (!isLoggedIn) {
  //     navigate("/onboarding", { state: { from: `/vendor/${props.slug}` } })
  //     return
  //   }
  //   setIsLiked(!isLiked)
  
  // }

  return (
    <div className="vendor_card">
      <div className="card_top_actions">
        <span className="see_more_lnk" onClick={goToVendor}>
          See More
        </span>
        <Button
          className="wishlist_btn"
          onClick={()=>navigate("/userdashboard")}
          btnText={isLiked ? <FaHeart size={12} color="#330159" /> : <FiHeart size={12} />}
        />
      </div>

<div className="vendor_img_box" onClick={goToVendor}>
  {props.image ? (
    <img src={props.image} alt={props.name} className="vendor_img" />
  ) : (
    <div className="vendor_avatar_fallback">
      {props.name?.charAt(0).toUpperCase() || "V"}
    </div>
  )}
</div>
      <div className="vendor_info">
        <h3 className="vendor_name" onClick={goToVendor}>
          {props.name}
        </h3>

        <div className="vendor_location">
          <IoLocationOutline className="Loc" size={22} />
          <span className="location-text">{props.location}</span>
        </div>

        <div className="vendor_rating">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              size={14} 
              color={i < props.rating ? "#000" : "#e0e0e0"} 
            />
          ))}
        </div>

        <div className="vendor_card_footer">
          <div className="price_box">
            <p className="price_lbl">Starting Price</p>
            <p className="price_amt">
              ₦{props.price ? props.price.toLocaleString() : 0}
            </p>
          </div>
          <Button 
            className="btn_purple" 
            onClick={handleBookNow}  
            btnText="Book now" 
          />
        </div>
      </div>
    </div>
  )
}

export default VendorCard