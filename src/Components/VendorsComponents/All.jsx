import {allVendors} from "../DummyData.jsx"
import VendorCard from "../../Props/VendorCard"
import "./css/All.css"
const AllVendors = () => {
  return (
    <div className="category_grid">
      {allVendors.map((vendor) => (
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
  )
}

export default AllVendors