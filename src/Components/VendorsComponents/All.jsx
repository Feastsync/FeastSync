import { useState, useEffect } from "react"
import { allVendors } from "../DummyData.jsx"
import VendorCard from "../../Props/VendorCard"
import "./css/All.css"

const getItemsPerPage = () => {
  if (window.innerWidth <= 540) return 4
  if (window.innerWidth <= 860) return 6
  return 9
}

const AllVendors = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
      setCurrentPage(1)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(allVendors.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const currentVendors = allVendors.slice(start, start + itemsPerPage)

  const changePage = (dir) => {
    const next = currentPage + dir
    if (next >= 1 && next <= totalPages) {
      setCurrentPage(next)
    }
  }

  return (
    <div>
      <div className="category_grid">
        {currentVendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            name={vendor.name}
            location={vendor.location}
            rating={vendor.rating}
            price={vendor.price}
            image={vendor.image}
          />
        ))}
      </div>

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
    </div>
  )
}

export default AllVendors