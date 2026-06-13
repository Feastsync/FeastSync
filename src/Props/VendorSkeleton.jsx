import React from 'react'
import './Css/VendorSkeleton.css'

const VendorCardSkeleton = () => {
  return (
    <div className="vendor-card skeleton">
      <div className="vendor-img skeleton-shimmer"></div>
      <div className="vendor-body">
        <div className="skeleton-line title skeleton-shimmer"></div>
        <div className="skeleton-line location skeleton-shimmer"></div>
        <div className="skeleton-row">
          <div className="skeleton-line rating skeleton-shimmer"></div>
          <div className="skeleton-line price skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export default VendorCardSkeleton
