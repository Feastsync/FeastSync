import React, { useRef, useEffect, useState } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import VendorCard from '../../Props/VendorCard'
import "./Css/FeaturedVendor.css"
import api from '../../Redux/app/axios'

const FeaturedVendors = () => {
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await api.get('/vendor/all-vendors')
        setVendors(res.data?.data || [])
        console.log(res)
      } catch (err) {
        console.error(err.response?.data?.message || 'Failed to fetch vendors')
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const row1Vendors = vendors.slice(0, 8)
  const row2Vendors = vendors.slice(8, 16)

  const scrollRow = (ref, direction) => {
    const amount = 300
    if (direction === "left") {
      ref.current.scrollLeft -= amount
    } else {
      ref.current.scrollLeft += amount
    }
  }

  if (loading) return <p>Loading vendors...</p>

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
              <div key={vendor._id} className="box">
                <VendorCard
                  id={vendor._id}
                  name={vendor.name}
                  location={vendor.location}
                  rating={vendor.rating}
                  price={vendor.price}
                  image={vendor.image}
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
              <div key={vendor._id} className="box">
                <VendorCard
                  id={vendor._id}
                  name={vendor.name}
                  location={vendor.location}
                  rating={vendor.rating}
                  price={vendor.price}
                  image={vendor.image}
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