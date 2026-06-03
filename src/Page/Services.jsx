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
          <p>
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
        
    <div className='servicePage'>
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
             <img src="src/assets/About/host.png" alt="" />
          </div>
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
            <p>Event Entertainment packages</p>
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
