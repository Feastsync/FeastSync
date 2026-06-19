import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { message } from "antd";
import api from "../../Redux/app/axios";
import { getVendorById } from "../../Redux/features/authslice";
import "../Css/Vendormediagallery.css";

const Vendormediagallery = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const videoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const [selectedMedia, setSelectedMedia] = useState(null);

  const { currentVendor, currentVendorLoading } = useSelector(
    (state) => state.auth
  );



  const photos = currentVendor?.photoCatalogue || [];
  const videos = currentVendor?.videoCatalogue || [];

  const handleEdit = (ref, item, mediaType) => {
     console.log("MEDIA ITEM:", item);
    setSelectedMedia({
      publicId: item.publicId,
      mediaType,
    });

    if (ref.current) {
      ref.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file || !selectedMedia) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("mediaType", selectedMedia.mediaType);
      formData.append("publicId", selectedMedia.publicId);

      await api.put(
        `/vendor/replace-media/${currentVendor._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Media updated successfully");

      dispatch(getVendorById(slug));

      setSelectedMedia(null);
      e.target.value = "";
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message ||
        "Failed to update media"
      );
    }
  };

  if (currentVendorLoading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className='vendormediagallery-container'>

      {/* Hidden file inputs for editing */}
      <input
        type="file"
        ref={videoInputRef}
        style={{ display: 'none' }}
        accept="video/*"
        onChange={handleFileChange}
      />

      <input
        type="file"
        ref={photoInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* SECTION 1: VIDEOS */}
      <div className="catalog-wrapper-section">
        <span className="gallery-small-label">Media gallery</span>
        <h4 className="gallery-subtitle">Video Showcase</h4>

        <div className="portfolio-white-card-box">
          <div className="gallery-grid-three-columns">
            {videos.map((item) => (
              <div
                key={item._id}
                className="gallery-thumbnail-wrap"
                style={{ position: 'relative' }}
              >
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                >
                  <source src={item.secureUrl} type="video/mp4" />
                </video>

                <button
                  className="media-edit-btn"
                  onClick={() =>
                    handleEdit(videoInputRef, item, "video")
                  }
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: PHOTOS */}
      <div className="showcase-wrapper-section">
        <h3 className="showcase-section-title">Media Gallery</h3>
        <span className="showcase-section-subtitle">
          Pictures ShowCase
        </span>

        <div className="portfolio-grid-two-columns">
          {photos.map((item) => (
            <div
              key={item._id}
              className="portfolio-detail-item-card"
              style={{ position: 'relative' }}
            >
              <div className="detail-card-image-wrap">
                <img
                  src={item.secureUrl}
                  alt="Vendor"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />

                <button
                  className="media-edit-btn"
                  onClick={() =>
                    handleEdit(photoInputRef, item, "photo")
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Vendormediagallery;