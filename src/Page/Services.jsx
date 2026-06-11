import React from "react";
import Header from "../Components/Header";
import Button from "../Props/Button";
import Footer from "../Components/Footer";
// import "./Css/Services.css";
import "./NewCSS/services.css";
import { useNavigate } from "react-router-dom";

const services = () => {
  const navigate = useNavigate();

  return (
    <main className="service-container">
      <div className="overlayer">
        <div className="servicesContainer">
          <p className="serviceContainerTitle">
            World-class entertainment <br />
            for every kind of event.
            </p>
          <p className="serviceDeliver">
            from initimate birthday dinners to large-scale coperate galas,{" "}
            <br />
            feastsync connects you with verified entertainment <br />
            professionals who deliver excellence-everytime.
           </p>
            <div className="serviceRate">
            <div>
              <p >7</p>
              <p className="serviceCategory">service categories</p>
            </div>
            <div>
              <p>100%</p>
              <p className="serviceCategory">Verified vendors</p>
            </div>
            <div>
              <p>&#8358; 0</p>
              <p className="serviceCategory">Payment risk</p>
            </div>
            <div>
              <p>48hr</p>
              <p className="serviceCategory">Average booking time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="service">
        <p className="serviceQuote">Our Services</p>

        <div className="serviceBooking">
          <img src="../public/About/dj wirewire.png" alt="DJ Booking" />
          <div className="serviceInfo">
            <div className="serviceHolder">
              <p className="serviceName">DJ Booking</p>
              <p>Music . Performance</p>
            </div>
            <div>
              <p className="serviceName">WHAT'S INCLUDED</p>
              <li>Professional sound system setup and breakdown</li>
              <li>Pre-event consultation on music preference and vibe</li>
              <li>Custom playlist curation for your event type</li>
              <li>
                Live mixing across Afrobeats, Amapiano, R&B, Hip-hop, Dancehall,
                and more
              </li>
            </div>
          </div>
        </div>

        <div className="serviceBookingLeft">
          <div className="serviceInfo">
            <div className="serviceHolder">
              <p className="serviceName">MC Booking</p>
              <p>Host.Compere</p>
            </div>
            <div>
              <p className="serviceName">WHAT'S INCLUDED</p>
              <li>Full event script consultation and programme coordination</li>
              <li>
                Billingual hosting-English, yoruba, igbo, pidgin, or hausa
              </li>
              <li>
                Guest engagement, games and crowd interaction where required
              </li>
              <li>Coordination with DJ,band and event planner</li>
              <li>Time management to keep event running on schedule</li>
            </div>
          </div>
          <img src="../public/About/host.png" alt="MC Host" />
        </div>
        <div className="serviceBooking">
          <img src="../public/About/mcs.png" alt="Live Band" />
          <div className="serviceInfo">
            <div className="serviceHolder">
              <p className="serviceName">Live Band Booking</p>
              <p>Live music.Ensemble</p>
            </div>
            <div>
              <p className="serviceName">WHAT'S INCLUDED</p>
              <li>Full band performance-depending on package</li>
              <li>Pre-event song request and setlist consultation</li>
              <li>Soundcheck and venue walkthrough before event start</li>
              <li>
                Genre flexibility across Afrobeats, highlife, gospel and jazz
              </li>
            </div>
          </div>
        </div>
        <div className="serviceBookingLeft">
          <div className="serviceInfo">
            <div className="serviceHolder">
              <p className="serviceName">Photography services</p>
              <p>Event photograph</p>
            </div>
            <div>
              <p className="serviceName">WHAT'S INCLUDED</p>
              <li>Full event coverage from setup to close</li>
              <li>Professionally edited high-resolution image delivery</li>
              <li>Online gallery with dowload access within 72 hours</li>
              <li>Portrait sessions for couple, VIP guests, or key moments</li>
              <li>Social media-optimized image set for some-day sharing</li>
            </div>
          </div>
          <img src="../public/About/photographer.png" alt="Photography" />
        </div>

        <div className="serviceBooking">
          <img src="../public/About/cameraman.png" alt="Videography" />
          <div className="serviceInfo">
            <div className="serviceHolder">
              <p className="serviceName">Videography services</p>
              <p>Event film.Highlight reels</p>
            </div>
            <div>
              <p className="serviceName">WHAT'S INCLUDED</p>
              <li>Multi-camera full event coverage</li>
              <li>Professionally color-graded highlight reel(3-5 minutes)</li>
              <li>Full-length event film for archive and personal use</li>
              <li>
                Instagrem and WhatsApp-optimised teaser cuts delivered within 48
                hours
              </li>
              <li>Drone coverage available as ad-on</li>
            </div>
          </div>
        </div>
      </div>

      <div className="serviceEntertainment">
        <div className="serviceCoperateHolder">
          <p className="serviceCoperate">Coporate Event Services</p>
          <p>Enterprise Brand events</p>
        </div>
        <div>
          <p className="serviceBrand">
            coperate events demands a different standard-brand appropiate
            entertainment impeccable professionalism <br />
            and zero margin for error FeastSync's connect organisation with
            verified entertainment <br />
            professionals who understand the difference between a party DJ and a
            brand activator DJ, between a wedding <br />
            MC and a product launch host. Wee match the right talent to the
            right coperate occasion, everytime.
          </p>
        </div>
        <Button btnText="Get Started" onClick={() => navigate('/onboarding')} className="servicebtn" />
      </div>

      <div className="serviceEntertainment">
        <div className="serviceCoperateHolder">
          <p className="serviceCoperate">Event Entertainment packages</p>
          <p>Bundle . Best value</p>
        </div>
        <div className="serviceBrandWrapper">
          <p className="serviceBrand">
            Why book seperately when you can have it all-perfectly
            coordinated?FeastSync's entertainment packages <br />
            bundle top-tier vendors into seamless,pre-matched combinations that
            work together fro the first soundcheck <br />
            to the last song.Book more, spend less and eliminate the
            coordination headache entirely.
          </p>
           <Button btnText="Get Started" onClick={() => navigate('/onboarding')} className="servicebtn" />
        </div>
      </div>
    </main>
  );
};

export default services;
