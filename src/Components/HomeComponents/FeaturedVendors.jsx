import React, { useRef } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import VendorCard from '../../Props/VendorCard'
import { dummyVendors } from '../../Components/DummyData'
import "./Css/FeaturedCard.css"
import Button from '../../Props/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FeaturedVendors = () => {
const navigate = useNavigate()


  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  const row1Vendors = dummyVendors.slice(0, 8)
  const row2Vendors = dummyVendors.slice(8, 16)


  const scrollRow = (ref, direction) => {
    const amount = 300 
    if (direction === "left") {
      ref.current.scrollLeft -= amount
    } else {
      ref.current.scrollLeft += amount
    }
  }

const topVendors = async()=>{
 try{
 const data = await axios.get("")
 }catch (error){
  
 }
}
  return (
    <section className="fv_sec">
      <div className="fv_container">

        <div className="fv_row_header">
          <h2 className="fv_title">Top Featured Vendors</h2>
        </div>

    
        <div className="fv_carousel_zone">

          <button className="btn2 left" onClick={() => scrollRow(row1Ref, "left")}>
            <IoChevronBackOutline size={40} />
          </button>
          <div className="fv_window" ref={row1Ref}>
            {row1Vendors.map((vendor) => (
              <div key={vendor.id} className="box">

                <VendorCard
                  // image={vendor.image}
                  // name={vendor.name}
                  // location={vendor.location}
                  // rating={vendor.rating}
                  // price={vendor.price}
                  // id ={vendor.id}
                />
              </div>
            ))}
          </div>

          <button className="btn2 right" onClick={() => scrollRow(row1Ref, "right")}>
            <IoChevronForwardOutline size={40} />
          </button>

        </div>

       
        <div className="fv_carousel_zone">

          <button className="btn2 left" onClick={() => scrollRow(row2Ref, "left")}>
            <IoChevronBackOutline size={40} />
          </button>

          <div className="fv_window" ref={row2Ref}>
            {row2Vendors.map((vendor) => (
              <div key={vendor.id} className="box">
                <VendorCard
                  // image={vendor.image}
                  // name={vendor.name}
                  // location={vendor.location}
                  // rating={vendor.rating}
                  // price={vendor.price}
                />
              </div>
            ))}
          </div>

          <button className="btn2 right" onClick={() => scrollRow(row2Ref, "right")}>
            <IoChevronForwardOutline size={40} />
          </button>

        </div>

      </div>
    </section>
  )
}

export default FeaturedVendors