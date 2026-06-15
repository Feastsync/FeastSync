import { useRef, useEffect, useState } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import VendorCard from '../../Props/VendorCard'
import "./Css/FeaturedVendor.css"
import api from '../../Redux/app/axios'

const FeaturedVendors = () => {
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get('/vendor/all-vendors')
        
        const mappedVendors = (res.data?.data || []).map(vendor => ({
          _id: vendor._id,
          slug: vendor.slug, 
          stageName: vendor.stageName || '',
          name: vendor.stageName || '',
          location: vendor.stateOfResidence || vendor.location || '',
          rating: Math.floor(vendor.averageRating || 0), 
          price: vendor.bookingFee || 0, 
          image: vendor.profilePicture?.secureUrl || vendor.profilePicture || ''
        }))
        setVendors(mappedVendors)
    
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch vendors')
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

  const SkeletonCard = () => (
    <div className="box">
      <div className="vendor-skeleton">
        <div className="skel-img shimmer"></div>
        <div className="skel-body">
          <div className="skel-line skel-title shimmer"></div>
          <div className="skel-line skel-text shimmer"></div>
          <div className="skel-line skel-text-sm shimmer"></div>
        </div>
      </div>
    </div>
  )

  const skeletonArray = Array.from({ length: 4 })

  return (
    <section className="fv_sec">
      <div className="fv_container">
        <div className="fv_row_header">
          <h2 className="fv_title">Top Featured Vendors</h2>
        </div>

        {error && !loading && (
          <div className="fv_state">
            <p> {error}</p>
            <button className="fv_retry" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}

        <div className="fv_carousel_zone">
          <button 
            className="btn2 left" 
            onClick={() => scrollRow(row1Ref, "left")} 
            disabled={loading || vendors.length === 0}
          >
            <IoChevronBackOutline size={40} />
          </button>
          <div className="fv_window" ref={row1Ref}>
            {loading 
              ? skeletonArray.map((_, i) => <SkeletonCard key={`sk1-${i}`} />)
              : row1Vendors.map((vendor) => (
                  <div key={vendor._id} className="box fade-in">
                    <VendorCard
                      id={vendor._id}
                      slug={vendor.slug}
                      name={vendor.stageName}
                      location={vendor.location}
                      rating={vendor.rating}
                      price={vendor.price}
                      image={vendor.image}
                    />
                  </div>
                ))
            }
          </div>
          <button 
            className="btn2 right" 
            onClick={() => scrollRow(row1Ref, "right")} 
            disabled={loading || vendors.length === 0}
          >
            <IoChevronForwardOutline size={40} />
          </button>
        </div>

        {(loading || row2Vendors.length > 0) && (
          <div className="fv_carousel_zone">
            <button 
              className="btn2 left" 
              onClick={() => scrollRow(row2Ref, "left")} 
              disabled={loading}
            >
              <IoChevronBackOutline size={40} />
            </button>
            <div className="fv_window" ref={row2Ref}>
              {loading 
                ? skeletonArray.map((_, i) => <SkeletonCard key={`sk2-${i}`} />)
                : row2Vendors.map((vendor) => (
                    <div key={vendor._id} className="box fade-in">
                      <VendorCard
                        id={vendor._id}
                        slug={vendor.slug}
                        name={vendor.stageName}
                        location={vendor.location}
                        rating={vendor.rating}
                        price={vendor.price}
                        image={vendor.image}
                      />
                    </div>
                  ))
              }
            </div>
            <button 
              className="btn2 right" 
              onClick={() => scrollRow(row2Ref, "right")} 
              disabled={loading}
            >
              <IoChevronForwardOutline size={40} />
            </button>
          </div>
        )}

        {!loading && !error && vendors.length === 0 && (
          <div className="fv_state">
            <p>No vendors found yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedVendors