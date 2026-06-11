import { useState, useEffect } from "react";
import VendorCard from "../../Props/VendorCard";
import "./css/All.css";
import api from "../../Redux/app/axios";

const getItemsPerPage = () => {
  if (window.innerWidth <= 540) return 4;
  if (window.innerWidth <= 860) return 6;
  return 9;
};

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await api.get("/vendor/all-vendors");

        setVendors(res.data?.data || []);
      } catch (err) {
        console.error(
          err.response?.data?.message || "Failed to fetch vendors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;

  const currentVendors = vendors.slice(
    start,
    start + itemsPerPage
  );

  const changePage = (dir) => {
    const next = currentPage + dir;

    if (next >= 1 && next <= totalPages) {
      setCurrentPage(next);
    }
  };

  if (loading) {
    return <p>Loading vendors...</p>;
  }

  return (
    <div>
      <div className="category_grid">
        {currentVendors.map((vendor) => (
          <VendorCard
            key={vendor._id}
            id={vendor._id}
            name={vendor.name}
            location={vendor.location}
            rating={vendor.rating}
            price={vendor.price}
            image={vendor.image}
          />
        ))}
      </div>

      {totalPages > 1 && (
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