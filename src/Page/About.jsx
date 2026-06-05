import React from "react";
import Header from "../Components/Header";
import Readytogetstarted from "../Components/Readytogetstarted";
import Footer from "../Components/Footer";
import Button from "../Props/Button";
import { feastsync } from "../mock/moc";
import { FaArrowRight } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { PiStarFour } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
// import "./Css/About.css";
// import "./NewCSS/about.css";

const About = () => {
  return (
    <main style={{ minHeight: "80vh" }}  className="mainAboutContainer">
      <section className="aboutContainer">
        <div className="aboutContainer1">
          <p className="about">About FeastSync</p>
          <p className="aboutInfo">
            Powering <br />
            entertainment <br />
            across Nigeria.
          </p>
        </div>
        <p className="about">
          Connect with top rated entainers for <br /> your next
          event.Professional service. <br />
          transparent rates.
        </p>
      </section>

      <section className="aboutWrapper">
        <div className="aboutWrapperleft">
          <div className="aboutWrapperHolder">
            <p className="aboutWrapperleftTitle">About Feastsync</p>
            <p>
              Feastsync is a premium digital booking platform connecting
              world-class event organisers with Nigeria's finest entertainment
              talent-backed by secure technology and build for trust
            </p>
          </div>

          <div className="aboutWrapperleftside">
            <p className="aboutWrapperleftTitle">Our story</p>
            <p>
              Nigeria's entertainment industry is world-class.The talent is
              undeniable.But for too long.event entertainers booking has relied
              on informal networks.Unreliable middlemen and payment system that
              put both organisers and entertainers at risk.
            </p>
            <p>
              Developed by a specialized team from the seventh cohort of The
              Curve Africa's tech trainee program, the platform replaces
              fragmented trust deficient booking processes with a structure
              secured and fully digital ecosystem- one where every transaction
              is protected, every profile is verified and every booking has a
              paper trail.
            </p>
          </div>
        </div>
        <div className="aboutWrapperRight">
          <img
            src="../assets/About/yoruba mc.png"
            alt="Yoruba MC"
            className="row-span-1-2"
          />
          <img src="../assets/About/photographer.png" alt="Photographer" />
          <img
            src="../assets/About/mc.png"
            alt="MC"
            className="row-span-2-2"
            style={{ height: "70vh" }}
          />
          <img
            src="../assets/About/igbodj.png"
            alt="Igbo DJ"
            className="row-span-3-2"
          />
        </div>
      </section>

      <section className="aboutMission">
        <div className="missionbox">
          <p className="missionQuote">Our Mission</p>
          <p>
            Our mission is to take the risk out of booking entertaiment.By
            connecting host with fully verified top-tier talent through a secure
            payment system. feastsync guarantees that every event-big or
            small-is built on absolute trust and professional execution.
          </p>
        </div>
        <div>
          <img src="../assets/About/pana.png" alt="Mission" />
        </div>
        <div className="missionHolder">
          <p className="missionQuote">Our Vision</p>
          <p>
            {" "}
            To create a world where booking live entertainment is entirely
            stress-free, establishing FeastSync as the global benchmark for
            secure, verified talent and flawless event execution.
          </p>
        </div>
      </section>

      <section>
        <div className="aboutValuesBox">
          <p className="aboutTeamTitle">What we stand for</p>
          <p>Four values.One platform</p>
        </div>
        <div className="aboutValues">
          <div className="aboutValuesText">
            <p>
              <span style={{ marginRight: "220px" }}>
                {" "}
                <FaHandsHelping /> Trust
              </span>
              Every entertainer is KYC-verified. Every payment is
              escrow-protected. Trust is not a feature-it is the foundation
            </p>
            <p>
              <span style={{ marginRight: "150px" }}>
                {" "}
                <PiStarFour /> seamlessness
              </span>
              From discovery to confermed booking in minutes.No back and forth
              calls. No waiting on a middleman to respond.
            </p>
          </div>

          <img
            src="../assets/About/party.jpg"
            alt="Party"
            className="row-spans-1-2"
          />
          <div className="aboutValuesText">
            <p>
              <span style={{ marginRight: "180px" }}>
                <TbTargetArrow /> Excellence
              </span>
              We curate.not aggregate.Every entertainer on feastsync meets a
              professional standard before their profile goes live
            </p>
            <p>
              <span style={{ marginRight: "160px" }}>
                <FaHandsHelping /> Transparency
              </span>
              Transparent pricing.Milestone based payouts.Dispute resolution
              with a human touch.Fair both sides,always.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutTrust">
        <p className="aboutTrustLogo">Trust & Safety</p>
        <p className="aboutTrustText">
          Your protection is built into every booking.
        </p>
        <p className="">
          Feastsync is designed around one principle no one shoul have to risk
          to book or perform <br />
          at an event.Our three layer protection system covers identity money
          and fairness-from the <br />
          first click to the final payout
        </p>
        <span className="btnmore">
          <p>Learn more</p>
          <FaArrowRight />
        </span>
      </section>

      <section className="aboutTeamText">
        <div>
          <p className="aboutTeamTitle">Meet the Team</p>
          <p>The brain behind feastsync</p>
        </div>
        <div className="aboutTeamBox">
          {feastsync.map((item, index) => (
            <div key={index}>
              <div className="aboutTeam">
                <div className="aboutImgHolder">
                  <img src={item.image} alt="" />
                </div>
                <div className="aboutTeamText">
                  <p className="aboutName">{item.name}</p>
                  <p>{item.stack}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Readytogetstarted />
    </main>
  );
};

export default About;
