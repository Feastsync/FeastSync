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
  const uploadVideoRef = useRef(null);
  const uploadPhotoRef = useRef(null);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [uploading, setUploading] = useState(false);

  const photos = vendor?.photoCatalogue || [];
  const videos = vendor?.videoCatalogue || [];

  const maxPhotos = 4;
  const maxVideos = 2;

  const emptyPhotoSlots = Math.max(0, maxPhotos - photos.length);
  const emptyVideoSlots = Math.max(0, maxVideos - videos.length);

  // ── Replace existing media ──
  const handleEdit = (ref, item, mediaType) => {
    setSelectedMedia({ publicId: item.publicId, mediaType });
    if (ref.current) ref.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedMedia) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mediaType", selectedMedia.mediaType);
      formData.append("publicId", selectedMedia.publicId);

      await api.put(`/vendor/replace-media/${vendor._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Media updated successfully");
      dispatch(getVendorById(vendor.slug));
      setSelectedMedia(null);
      e.target.value = "";
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || "Failed to update media");
    }
  };

  // ── Upload new media ──
  const handleUploadNew = async (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      setUploading(true);
      const formData = new FormData();

      if (type === "photo") {
        files.forEach((f) => formData.append("photoCatalogue", f));
      } else {
        files.forEach((f) => formData.append("videoCatalogue", f));
      }

      await api.put(`/vendor/upload-media/${vendor._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(`${type === "photo" ? "Photo" : "Video"} uploaded successfully`);
      dispatch(getVendorById(vendor.slug));
      e.target.value = "";
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="vendormediagallery-container">

      {/* Hidden inputs for replacing existing media */}
      <input type="file" ref={videoInputRef} style={{ display: "none" }} accept="video/*" onChange={handleFileChange} />
      <input type="file" ref={photoInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />

      {/* Hidden inputs for uploading new media */}
      <input
        type="file"
        ref={uploadVideoRef}
        style={{ display: "none" }}
        accept="video/*"
        multiple
        onChange={(e) => handleUploadNew(e, "video")}
      />
      <input
        type="file"
        ref={uploadPhotoRef}
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={(e) => handleUploadNew(e, "photo")}
      />

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="vmg-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="vmg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="vmg-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.type === "image" ? (
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
        <div className="vmg-section-header">
          <h4 className="gallery-subtitle">Video Showcase</h4>
          {isOwner && emptyVideoSlots > 0 && (
            <span className="vmg-slot-hint">{videos.length}/{maxVideos} videos uploaded</span>
          )}
        </div>

        <div className="portfolio-white-card-box">
          <div className="gallery-grid-three-columns">
            {/* Existing videos */}
            {videos.map((item) => (
              <div key={item._id} className="gallery-thumbnail-wrap">
                <video
                  onClick={() => setLightbox({ type: "video", url: item.secureUrl })}
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

            {/* Empty upload slots for owner */}
            {isOwner && Array.from({ length: emptyVideoSlots }).map((_, i) => (
              <div
                key={`video-empty-${i}`}
                className="vmg-upload-slot"
                onClick={() => !uploading && uploadVideoRef.current?.click()}
              >
                {uploading ? (
                  <div className="vmg-upload-slot__spinner" />
                ) : (
                  <>
                    <div className="vmg-upload-slot__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 10l4.553-2.069A1 1 0 0121 8.847v6.306a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                    </div>
                    <p className="vmg-upload-slot__label">Add Video</p>
                    <p className="vmg-upload-slot__sub">Click to upload · max 2 videos</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PHOTO SECTION ── */}
      <div className="showcase-wrapper-section">
        <h3 className="showcase-section-title">Media Gallery</h3>
        <div className="vmg-section-header">
          <span className="showcase-section-subtitle">Pictures Showcase</span>
          {isOwner && emptyPhotoSlots > 0 && (
            <span className="vmg-slot-hint">{photos.length}/{maxPhotos} photos uploaded</span>
          )}
        </div>

        <div className="portfolio-grid-two-columns">
          {/* Existing photos */}
          {photos.map((item) => (
            <div key={item._id} className="portfolio-detail-item-card">
              <div className="detail-card-image-wrap">
                <img
                  src={item.secureUrl}
                  alt="Vendor"
                  onClick={() => setLightbox({ type: "image", url: item.secureUrl })}
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

          {/* Empty upload slots for owner */}
          {isOwner && Array.from({ length: emptyPhotoSlots }).map((_, i) => (
            <div
              key={`photo-empty-${i}`}
              className="portfolio-detail-item-card"
            >
              <div
                className="detail-card-image-wrap vmg-upload-slot"
                onClick={() => !uploading && uploadPhotoRef.current?.click()}
              >
                {uploading ? (
                  <div className="vmg-upload-slot__spinner" />
                ) : (
                  <>
                    <div className="vmg-upload-slot__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="vmg-upload-slot__label">Add Photo</p>
                    <p className="vmg-upload-slot__sub">Click to upload · max 4 photos</p>
                  </>
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