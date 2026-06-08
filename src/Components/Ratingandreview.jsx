import React from 'react';
import './Css/Ratingandreview.css';

const Ratingandreview = () => {
  const reviewsData = [
    {
      id: 1,
      initial: "T",
      avatarClass: "ratingandreview-blue-bg",
      username: "Toyin O.",
      starsCount: 5,
      booking: "Wedding Reception",
      date: "2 weeks ago",
      comment: "DJ Kolade completely transformed our reception. He read the room perfectly — from quiet dinner music to full Afrobeats mode the moment the MC cued him. Our guests are still talking about it!"
    },
    {
      id: 2,
      initial: "A",
      avatarClass: "ratingandreview-green-bg",
      username: "Adebayo M.",
      starsCount: 5,
      booking: "Corporate Event",
      date: "1 month ago",
      comment: "Professional, punctual, and incredibly talented. Made our company anniversary celebration memorable. Highly recommend!"
    }
  ];

  return (
    <div className="ratingandreview-container">
      <h2 className="ratingandreview-title">Review and Rating</h2>
      
      <div className="ratingandreview-summary-section">
        <div className="ratingandreview-score-block">
          <span className="ratingandreview-big-score">4.5</span>
          <div className="ratingandreview-stars ratingandreview-header-stars">
            <span>★</span><span>★</span><span>★</span><span>★</span><span className="ratingandreview-half-star">★</span>
          </div>
        </div>
        
        <div className="ratingandreview-bars-block">
          <div className="ratingandreview-bar-row"><span>5</span><div className="ratingandreview-bar"><div className="ratingandreview-fill" style={{width: '55%'}}></div></div></div>
          <div className="ratingandreview-bar-row"><span>4</span><div className="ratingandreview-bar"><div className="ratingandreview-fill" style={{width: '12%'}}></div></div></div>
          <div className="ratingandreview-bar-row"><span>3</span><div className="ratingandreview-bar"><div className="ratingandreview-fill" style={{width: '5%'}}></div></div></div>
          <div className="ratingandreview-bar-row"><span>2</span><div className="ratingandreview-bar"><div className="ratingandreview-fill" style={{width: '3%'}}></div></div></div>
          <div className="ratingandreview-bar-row"><span>1</span><div className="ratingandreview-bar"><div className="ratingandreview-fill" style={{width: '7%'}}></div></div></div>
        </div>
      </div>

      <div className="ratingandreview-card">
        <h3 className="ratingandreview-heading">Reviews</h3>
        
        {reviewsData.map((item) => (
          <div key={item.id} className="ratingandreview-item">
            <div className="ratingandreview-item-header">
              <div className={`ratingandreview-avatar ${item.avatarClass}`}>{item.initial}</div>
              <div className="ratingandreview-user-details">
                <span className="ratingandreview-username">{item.username}</span>
                <div className="ratingandreview-stars ratingandreview-text-stars">
                  {Array.from({ length: item.starsCount }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="ratingandreview-booking">
                  <span className="ratingandreview-grey-text">Booked for:</span> {item.booking}
                </span>
              </div>
              <span className="ratingandreview-date">{item.date}</span>
            </div>
            <p className="ratingandreview-comment">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratingandreview;
