import React from 'react'
import"../Page/Css/Services.css"
import Header from '../Components/Header'
import Button from '../Props/Button'
import Footer from "../Components/Footer"

const services = () => {
  return (
    <div className='service'>
      <Header />
      <div className='overlayer'>
        <div className='servicesContainer'>
          <p className='serviceContainerTitle'>
            World-class entertainment <br />
            for every kind of event.
          </p>
          <p className='serviceDeliver'>
            from initimate birthday dinners to large-scale coperate galas, <br />
            feastsync connects you with verified entertainment <br />
            professionals who deliver excellence-everytime. 
          </p>
          <div className='serviceRate'>
            <div>
              <p>7</p>
              <p className='serviceCategory'>service categories</p>
            </div>
            <div>
              <p>100%</p>
              <p className='serviceCategory'>Verified vendors</p>
            </div>
            <div>
              <p>&#8358; 0</p>
              <p className='serviceCategory'>Payment risk</p>
            </div>
            <div >
              <p>48hr</p>
              <p className='serviceCategory'>Average booking time</p>
            </div>
          </div>
        </div>
      </div>
        
    <div className='service'>
      <p className='serviceQuote'>Our Services</p>

      <div className='serviceBooking'>
            <img src="src/assets/About/dj wirewire.png" alt="" />
            <div className='serviceInfo'>
            <div>
              <p className='serviceName'>DJ Booking</p>
              <p>Music . Performance</p>
            </div>
            <div>
              <p className='serviceName'>WHAT'S INCLUDED</p>
              <li>Professional sound system setup and breakdown</li>
              <li>Pre-event consultation on music preference and vibe</li>
              <li>Custom playlist curation for your event type</li>
              <li>Live mixing across Afrobeats, Amapiano, R&B, Hip-hop, Dancehall, and more</li>
            </div>
            </div>
          </div>

          <div className='serviceBooking'>
            <div className='serviceInfo'>
            <div>
              <p className='serviceName'>MC Booking</p>
              <p>Host.Compere</p>
            </div>
            <div>
              <p className='serviceName'>WHAT'S INCLUDED</p>
              <li>Full event script consultation and programme coordination</li>
              <li>Billingual hosting-English, yoruba, igbo, pidgin, or hausa</li>
              <li>Guest engagement, games and crowd interaction where required</li>
              <li>Coordination with DJ,band and event planner</li>
              <li>Time management to keep event running on schedule</li>
            </div>
            </div>
             <img src="src/assets/About/host.png" alt="" />
          </div>
          <div className='serviceBooking'>
            <img src="src/assets/About/mcs.png" alt="" />
            <div className='serviceInfo'>
            <div>
              <p className='serviceName'>Live Band Booking</p>
              <p>Live music.Ensemble</p>
            </div>
            <div>
              <p className='serviceName'>WHAT'S INCLUDED</p>
              <li>Full band performance-depending on package</li>
              <li>Pre-event song request and setlist consultation</li>
              <li>Soundcheck and venue walkthrough before event start</li>
              <li>Genre flexibility across Afrobeats, highlife, gospel and jazz</li>
            </div>
            </div>
          </div>
                   <div className='serviceBooking'>
            <div className='serviceInfo'>
            <div>
              <p className='serviceName'>Photography services</p>
              <p>Event photograph</p>
            </div>
            <div>
              <p className='serviceName'>WHAT'S INCLUDED</p>
              <li>Full event coverage from setup to close</li>
              <li>Professionally edited high-resolution image delivery</li>
              <li>Online gallery with dowload access within 72 hours</li>
              <li>Portrait sessions for couple, VIP guests, or key moments</li>
              <li>Social media-optimized image set for some-day sharing</li>
            </div>
            </div>
             <img src="src/assets/About/photographer.png" alt="" />
          </div>
          
          <div className='serviceBooking'>
            <img src="src/assets/About/cameraman.png" alt="" />
            <div className='serviceInfo'>
            <div>
              <p className='serviceName'>DJ Booking</p>
              <p>Music . Performance</p>
            </div>
            <div>
              <p className='serviceName'>WHAT'S INCLUDED</p>
              <li>Professional sound system setup and breakdown</li>
              <li>Pre-event consultation on music preference and vibe</li>
              <li>Custom playlist curation for your event type</li>
              <li>Live mixing across Afrobeats, Amapiano, R&B, Hip-hop, Dancehall, and more</li>
            </div>
            </div>
          </div>
        </div>

        <div className='serviceEntertainment'>
          <div>
            <p className='serviceCoperate'>Coporate Event Services</p>
            <p>Enterprise Brand events</p>
          </div>
         <div>
           <p>coperate events demands a different standard-brand appropiate entertainment impeccable professionalism <br />
              and zero margin for error FeastSync's connect organisation with verified entertainment <br />
              professionals who understand the difference between a party DJ and a brand activator DJ, between a wedding <br />
              MC and a product launch host. Wee match the right talent to the right coperate occasion, everytime. 
           </p>
         </div>
         <Button btnText="Get Started" className="header_getstarted_btn" />
        </div>

        <div  className='serviceEntertainment'>
          <div>
            <p className='serviceCoperate'>Event Entertainment packages</p>
            <p>Bundle . Best value</p>
          </div>
        <div>
            <p>Lorem ipsum dolor sit ame
            t, consectetur adipisicing elit. 
            Ipsum assumenda soluta suscipit et 
            tempora quia facilis 
            tempore voluptatem. Quod assumenda 
            possimus repellat ipsam 
            aliquid omnis animi aut
            em sequi pariatur rerum?
            </p>
        </div>
         <Button btnText="Get Started" className="header_getstarted_btn" />
        </div>
        
        <Footer />
    </div>
  )
}

export default services
