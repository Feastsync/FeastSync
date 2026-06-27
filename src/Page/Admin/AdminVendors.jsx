import React, { useState, useEffect } from "react";
import { message } from "antd";
import api from "../../Redux/app/axios";
import "./css/AdminUser.css";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/admin/all-vendors");
      const vendorList = res.data?.data || res.data || [];
      setVendors(
        Array.isArray(vendorList)
          ? vendorList.map((vendor) => ({
              _id: vendor._id || vendor.id,
              name:
                vendor.stageName || vendor.name ||
                `${vendor.firstName || ""} ${vendor.lastName || ""}`.trim() ||
                "Vendor",
              email: vendor.email || vendor.userEmail || "",
              verificationStatus: vendor.verificationStatus || vendor.status || "pending",
              category: vendor.category || "N/A",
              phone: vendor.phone || vendor.contact || "",
            }))
          : [],
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const verifyVendor = async (vendorId) => {
    try {
      const res = await api.put(`/admin/verify-vendor/${vendorId}`);
      message.success(res.data?.message || "Vendor verified successfully");
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === vendorId
            ? { ...vendor, verificationStatus: "approved" }
            : vendor,
        ),
      );
    } catch (err) {
      message.error(err.response?.data?.message || err.message || "Verification failed");
    }
  };

  if (loading) {
    return (
      <div className="adminUserHolder">
        <div className="adminUserContainer">
          <p>Loading vendors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="adminUserHolder">
        <div className="adminUserContainer">
          <p style={{ color: "#d00" }}>Error loading vendors</p>
          <p>{error}</p>
          <button onClick={fetchVendors}>Retry</button>
        </div>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="adminUserHolder">
        <div className="adminUserContainer">
          <p>No vendors available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adminUserHolder">
      <div className="adminVendorsGrid">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="adminVendorCard">
            <div className="adminVendorHeader">
              <p>{vendor.name}</p>
              <span>{vendor.verificationStatus}</span>
            </div>
            <p>Email: {vendor.email}</p>
            <p>Category: {vendor.category}</p>
            <p>Phone: {vendor.phone}</p>
            <button
              disabled={vendor.verificationStatus !== "pending"}
              onClick={() => verifyVendor(vendor._id)}
            >
              {vendor.verificationStatus === "pending" ? "Verify" : "Verified"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVendors;
