import React from 'react'
import"../Page/Css/About.css"
import Header from"../Components/Header"
import Button from '../Props/Button'
import { feastsync } from '../mock/moc'
import { div } from 'motion/react-client'
const About = () => {
  return (
    <div className='container'>
     <Header />
     <div className='aboutContainer'> 
        <p>About FeastSync</p>
        <p className='aboutInfo'>Powering <br />
           entertainment <br />
           across Nigeria.
        </p>
        <p>connect with top rated entainers <br />
           for your next event.Professional service. <br />
           transparent rates.</p>
     </div>

    <div className='aboutWrapper'>
        <div className='aboutWrapperleft'>
        <div>
          <p className='aboutWrapperleftTitle'>About Feastsync</p>
          <p>Feastsync is a premium digital booking platform
            connecting world-class event organisers with Nigeria's
            finest entertainment talent-backed by secure
            technology and build for trust
          </p>
        </div>
      <div className='aboutWrapperleftside'>

          <p className='aboutWrapperleftTitle'>Our story</p>
          <p>Nigeria's entertainment industry is world-class.The talent
            is undeniable.But for too long.event entertainers booking
            has relied on informal networks.Unreliable middlemen and payment system that put both organisers and 
            entertainers at risk.
          </p>
          <p>Developed by a specialized team from the seventh cohort
          of The Curve Africa's tech trainee program, the platform 
          replaces fragmented trust deficient booking processes
          with a structure secured and fully digital ecosystem-
          one where every transaction is protected, every profile is 
          verified and every booking has a paper trail.
          </p>
        </div>
      </div>
      <div className='aboutWrapperRight'>
        <img src="src/assets/About/yoruba mc.png" alt="" className='row-span-1-2' />
        <img src="src/assets/About/photographer.png" alt="" />
        <img src="src/assets/About/photographer.png" alt="" className='row-span-2-2' />
        <img src="src/assets/About/joy.jpg" alt="" className='row-span-3-2'/>
      </div>
     </div>

     <div className='aboutMission'>
      <div>
        <p>Our Mission</p>
        <p>Our mission is to take the risk out of
          booking entertaiment.By connecting
          host with fully verified top-tier talent
          through a secure payment system.
          feastsync guarantees that every event-big or small-is built on absolute trust and
          professional execution.
        </p>
      </div>
      <div><img src="" alt="" />ikhlsfvik.uv</div>
      <div>
        <p>Our Vision</p>
        <p> To create a world where booking live
          entertainment is entirely stress-free,
          establishing FeastSync as the global benchmark for secure, verified talent and 
          flawless event execution.
        </p>
      </div>
     </div>

     <div>
      <div>
        <p>What we stand for</p>
        <p>Four values.One platform</p>
      </div>
      <div className='aboutValues'>
          
          <p className='rows-spans-1-2'><span>Trust</span>Every entertainer is KYC-verified.
            Every payment is escrow-protected.
            Trust is not a feature-it is the foundation
            </p>
            <p className='row-spans-3-2'>
          <span>seamlessness</span>
          From discovery to confermed booking in minutes.No back and forth calls.
            No waiting on a middleman to respond.       
             </p>

             <img src="src/assets/About/party.jpg" alt="" className='row-spans-1-2'/>
        <p className='row-spans-1-2'>
          <span>excellence</span>
          we curate.not aggregate.Every entertainer on feastsync meets a professional standard
            before their profile goes live
          </p>
          <p className='row-span-3-2'>
          <span>Transparency</span>
          Transparent pricing.Milestone based
            payouts.Dispute resolution with a human touch.Fair both sides,always.
          </p>
             </div>
     </div>

     <div className='aboutTrust'>
      <p className='aboutTrustLogo'>Trust & Safety</p>
      <p className='aboutTrustText'>Your protection is built into every booking.</p>
      <p>feastsync is designed around one principle no one shoul have to risk to book or perform <br />
        at an event.Our three layer protection system covers identity money and fairness-from the <br />
        first click to the final payout
      </p>
      <p className="aboutTrustinfo">learn more</p>
      </div>     

      <div className='aboutTeamText'>
        <div>
          <p className='aboutTeamTitle'>Meet the Team</p>
        <p>The brain behind feastsync</p>
        </div>
        <div className='aboutTeamBox'>
          {
            feastsync.map((item, index)=>(
              <div key={index}>
                <div className='aboutTeam'>
                  <img src={item.image} alt="" />
                <div>
                    <p>{item.name}</p>
                  <p>{item.stack}</p>
                </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>

      <div className='aboutExplore'>
        <p>Ready to get started?</p>
        <p className='AboutExploreText'>Your next great event begins here.</p>
        <p>whether you are planning an event or ready to list your talent -FeastSync is built for you</p>
       <div className='btn'>
         <Button btnText="Get Started" className="header_getstarted_btn"/>
        <Button btnText="Explore Vendors" className="about_getstarted_btn_left"/>
       </div>
      </div>
    </div>
  )
}

export default About
