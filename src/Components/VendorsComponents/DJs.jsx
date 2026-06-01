import { djVendors } from "../DummyData"
import VendorCard from "../../Props/VendorCard"
import "./css/All.css"

const DjVendors = () => {
  return (
    <div className="category_grid">
      {djVendors.map((vendor) => (
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

export default DjVendors