import React, { useRef, useEffect, useState } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import VendorCard from '../../Props/VendorCard'
import VendorCardSkeleton from '../../Props/VendorSkeleton'
import './css/All.css'
import api from '../../Redux/app/axios'

const FeaturedVendors = () => {
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVendors = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get('/vendor/all-vendors')
      
      const mappedVendors = (res.data?.data || []).map(vendor => ({
        _id: vendor._id,
        name: vendor.stageName || 'Unknown Artist',
        location: vendor.city || vendor.location || 'Lagos, NG',
        rating: vendor.averageRating || vendor.rating || 4.5,
        price: vendor.startingPrice 
          ? `₦${Number(vendor.startingPrice).toLocaleString()}` 
          : 'Contact for price',
        image: vendor.profileImage || vendor.avatar || vendor.image || ''
      }))
      setVendors(mappedVendors)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch vendors')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const scrollRow = (ref, direction) => {
    const amount = 300
    if (ref.current) {
      ref.current.scrollLeft += direction === "left" ? -amount : amount
    }
  }

  const row1Vendors = vendors.slice(0, 8)
  const row2Vendors = vendors.slice(8, 16)
  const skeletonArray = Array.from({ length: 4 })

  return (
    <section className="fv_sec">
      <div className="fv_container">
        <div className="fv_row_header">
          <h2 className="fv_title">Top Featured Vendors</h2>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="fv_error">
            <div className="fv_error_icon"></div>
            <p>{error}</p>
            <button onClick={fetchVendors}>Retry</button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && vendors.length === 0 && (
          <div className="fv_empty">
            <div className="fv_empty_icon">📭</div>
            <p>No vendors found yet. Check back soon!</p>
          </div>
        )}

        {/* Carousel - only show if no error */}
        {!error && (
          <>
            <div className="fv_carousel_zone">
              <button className="btn2 left" onClick={() => scrollRow(row1Ref, "left")} disabled={loading}>
                <IoChevronBackOutline size={40} />
              </button>
              <div className="fv_window" ref={row1Ref}>
                {loading 
                  ? skeletonArray.map((_, i) => (
                      <div key={`skel-1-${i}`} className="box">
                        <VendorCardSkeleton />
                      </div>
                    ))
                  : row1Vendors.map((vendor) => (
                      <div key={vendor._id} className="box">
                        <VendorCard {...vendor} id={vendor._id} />
                      </div>
                    ))
                }
              </div>
              <button className="btn2 right" onClick={() => scrollRow(row1Ref, "right")} disabled={loading}>
                <IoChevronForwardOutline size={40} />
              </button>
            </div>

            {(loading || row2Vendors.length > 0) && (
              <div className="fv_carousel_zone">
                <button className="btn2 left" onClick={() => scrollRow(row2Ref, "left")} disabled={loading}>
                  <IoChevronBackOutline size={40} />
                </button>
                <div className="fv_window" ref={row2Ref}>
                  {loading 
                    ? skeletonArray.map((_, i) => (
                        <div key={`skel-2-${i}`} className="box">
                          <VendorCardSkeleton />
                        </div>
                      ))
                    : row2Vendors.map((vendor) => (
                        <div key={vendor._id} className="box">
                          <VendorCard {...vendor} id={vendor._id} />
                        </div>
                      ))
                  }
                </div>
                <button className="btn2 right" onClick={() => scrollRow(row2Ref, "right")} disabled={loading}>
                  <IoChevronForwardOutline size={40} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default FeaturedVendors