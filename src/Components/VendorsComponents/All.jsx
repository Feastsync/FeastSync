import { useState, useEffect } from "react";
import VendorCard from "../../Props/VendorCard";
import VendorCardSkeleton from "../../Props/VendorSkeleton";
import "./css/All.css";
import api from "../../Redux/app/axios";

const getItemsPerPage = () => {
  if (window.innerWidth <= 540) return 4;
  if (window.innerWidth <= 860) return 6;
  return 9;
};

const AllVendors = () => {
  const [vendors, setVendors]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());


  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get('/vendor/all-vendors')
        console.log("First vendor:", res.data?.data?.[0])
        const mappedVendors = (res.data?.data || []).map(vendor => ({
          _id: vendor._id,
          slug: vendor.slug, 
          stageName: vendor.stageName || '',
          name: vendor.stageName || '',
          location: vendor.stateOfResidence || vendor.location || '',
          rating: Math.floor(vendor.averageRating || 0), 
            pprice: vendor.pricingId?.find(
  (p) => p.packageName === "Basic Package"
         )?.packagePrice || vendor.bookingFee || 0,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skeletonArray  = Array.from({ length: itemsPerPage });
  const totalPages     = Math.ceil(vendors.length / itemsPerPage);
  const start          = (currentPage - 1) * itemsPerPage;
  const currentVendors = vendors.slice(start, start + itemsPerPage);

  const changePage = (dir) => {
    const next = currentPage + dir;
    if (next >= 1 && next <= totalPages) setCurrentPage(next);
  };

 
  if (error && !loading) {
    return (
      <div className="vendor-state-wrap">
        <div className="vendor-state-card">
          <span className="vendor-state-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="vendor-retry-btn" onClick={fetchVendors}>
            Retry
          </button>
        </div>
      </div>
    );
  }


  if (!loading && vendors.length === 0) {
    return (
      <div className="vendor-state-wrap">
        <div className="vendor-state-card">
          <span className="vendor-state-icon">🔍</span>
          <h2>No Vendors Found</h2>
          <p>No vendors available yet. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-vendors-page">
      <div className="category_grid">
        {loading
          ? skeletonArray.map((_, i) => (
              <VendorCardSkeleton key={`sk-${i}`} />
            ))
          : currentVendors.map((vendor) => (
              <div key={vendor._id} className="fade-in">
                <VendorCard
                  id={vendor._id}
                  name={vendor.name}
                  location={vendor.location}
                  rating={vendor.rating}
                  price={vendor.pprice}
                  image={vendor.image}
                  slug={vendor.slug}
                />
              </div>
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination_btn"
            onClick={() => changePage(-1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="pagination_info">
            {currentPage} of {totalPages}
          </span>
          <button
            className="pagination_btn"
            onClick={() => changePage(1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllVendors;