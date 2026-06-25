import React, { useRef, useState } from 'react'; 
import { useDispatch } from "react-redux";
import { message } from "antd";
import api from "../../Redux/app/axios";
import { getVendorById } from "../../Redux/features/authslice";
import "../Css/Vendormediagallery.css";

const Vendormediagallery = ({ vendor, isOwner }) => {
  const dispatch = useDispatch();

  const videoInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const photos = vendor?.photoCatalogue || [];
  const videos = vendor?.videoCatalogue || [];

  const handleEdit = (ref, item, mediaType) => {
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
        `/vendor/replace-media/${vendor._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Media updated successfully");
      dispatch(getVendorById(vendor.slug));
      setSelectedMedia(null);
      e.target.value = "";
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.message || "Failed to update media"
      );
    }
  };

  return (
    <div className='vendormediagallery-container'>

      <input type="file" ref={videoInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleFileChange} />
      <input type="file" ref={photoInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="vmg-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="vmg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="vmg-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.type === 'image' ? (
              <img src={lightbox.url} alt="Preview" className="vmg-lightbox-media" />
            ) : (
              <video controls autoPlay className="vmg-lightbox-media">
                <source src={lightbox.url} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}

      {/* ── VIDEO SECTION ── */}
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
                  onClick={() => setLightbox({ type: 'video', url: item.secureUrl })}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "pointer" }}
                >
                  <source src={item.secureUrl} type="video/mp4" />
                </video>

                {isOwner && (
                  <button
                    className="media-edit-btn"
                    onClick={() => handleEdit(videoInputRef, item, "videoCatalogue")}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PHOTO SECTION ── */}
      <div className="showcase-wrapper-section">
        <h3 className="showcase-section-title">Media Gallery</h3>
        <span className="showcase-section-subtitle">Pictures ShowCase</span>

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
                  onClick={() => setLightbox({ type: 'image', url: item.secureUrl })}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "pointer" }}
                />

                {isOwner && (
                  <button
                    className="media-edit-btn"
                    onClick={() => handleEdit(photoInputRef, item, "photoCatalogue")}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Vendormediagallery;