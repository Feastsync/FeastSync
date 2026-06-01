import { mcVendors } from "../DummyData"
import VendorCard from "../../Props/VendorCard"
import "./css/All.css"

const McVendors = () => {
  return (
    <div className="category_grid">
      {mcVendors.map((vendor) => (
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

export default McVendors