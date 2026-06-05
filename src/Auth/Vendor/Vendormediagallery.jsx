import React from 'react';
import "../Css/Vendormediagallery.css";
import Womanwithmic from "../../assets/logos/verified.png";
import Hausamanandwoman from "../../assets/logos/Hausamanandwoman.jpg";
import Yourabamanandwoman from "../../assets/logos/Yourabamanandwoman.jpg";
import Yorubabride from "../../assets/logos/Yorubabride.jpg";
import Yorubamancarryhisbride from "../../assets/logos/Yorubamancarryhisbride.jpg";
import Coupleonthedancefloor from "../../assets/logos/Coupleonthedancefloor.jpg";

const Vendormediagallery = () => {
  const mediaGalleryImages = [
    Womanwithmic, 
    Hausamanandwoman, 
    Yourabamanandwoman, 
    Yorubabride, 
    Yorubamancarryhisbride, 
    Coupleonthedancefloor
  ];

  const portfolioItems = [
    {
      id: 1,
      image: "https://i.postimg.cc/NfVhL23D/4bbc686d517abc7a16757a9e6a0bf6eff79f1f7a-(1).jpg", // Changed from Media4
      title: "Tolu and Femi Wedding",
      venue: "Eko Hotel",
      date: "Jan 2026",
      guests: "350 guests"
    },
    {
      id: 2,
      image: "https://i.postimg.cc/GmYf27P7/49425bb335d1d0b58bcb5e3d8dfd858efd53bd3f-(1).jpg",
      title: "Adeola & Emeka Wedding",
      venue: "Eko Hotel",
      date: "Apr 2026",
      guests: "350 guests"
    },
    {
      id: 3,
      image: "https://i.postimg.cc/xCsx7WYb/05a140a18c0e68c133e17fd7fc37077c4746c5b7.jpg",
      title: "Adeola & Emeka Wedding",
      venue: "Eko Hotel",
      date: "Apr 2026",
      guests: "350 guests"
    },
    {
      id: 4,
      image: "https://i.postimg.cc/hPQyyyYv/568f928767287a718e89a849caec8a1128f0f578.jpg",
      title: "Adeola & Emeka Wedding",
      venue: "Eko Hotel",
      date: "Apr 2026",
      guests: "350 guests"
    }
  ];

  return (
    <div className='vendormediagallery-container'>
      <div className="catalog-wrapper-section">
        <span className="gallery-small-label">Media gallery</span>
        <h4 className="gallery-subtitle">Photos/Video Catalog</h4>
        
        <div className="portfolio-white-card-box">
          <h3 className="card-box-main-title">Portfolio</h3>
          
          <div className="gallery-grid-three-columns">
            {mediaGalleryImages.map((imgSrc, index) => (
              <div key={index} className="gallery-thumbnail-wrap">
                <img src={imgSrc} alt={`Gallery item ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="showcase-wrapper-section">
        <h3 className="showcase-section-title">Portfolio</h3>
        <span className="showcase-section-subtitle">Media gallery</span>

        <div className="portfolio-grid-two-columns">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-detail-item-card">
              <div className="detail-card-image-wrap">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="detail-card-info-content">
                <h4 className="detail-item-title">{item.title}</h4>
                <p className="detail-item-metadata">
                  {item.venue} • {item.date} • {item.guests}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Vendormediagallery;
