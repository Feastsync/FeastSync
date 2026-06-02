import React from "react";
import "./Css/OnBoarding.css";
import Headerlogo from "../assets/logos/Headerlogo.png";
import ImageIconwhite from "../assets/logos/imageiconwhite.png";
import ImageIconblack from "../assets/logos/imageiconblack.png";
import Circleiconhost from "../assets/logos/circleiconhost.svg";
import Circleiconvendor from "../assets/logos/circleiconvendor.svg";
import Button from "../Props/Button.jsx";
import Leftarrow from "../assets/logos/Leftarrow.svg";

const OnBoarding = () => {
  return (
    <main className="onboarding-container">
      <section className="onboarding-content">
        <section className="onboarding-content1">
          <img src={Headerlogo} alt="FeastSync Logo" />
          <h2>FeastSync</h2>
        </section>
        <section className="onboarding-content2">
          <h2>Create an account and get started with FeastSync</h2>
          <p>Choose an account type</p>
        </section>
        <section className="onboarding-content3">
          <article className="onboarding-content3-left">
            <article className="onboarding-content3-left1">
              <img
                className="onboarding-image"
                src={ImageIconwhite}
                alt="White Icon"
              />
              <h2>Personal</h2>
              <p>Register as a host/event organizer.</p>
              <img className="onboarding-image1" src={Circleiconhost} alt="" />
            </article>
          </article>
          <article className="onboarding-content3-right">
            <article className="onboarding-content3-right1">
              <img
                className="onboarding-image2"
                src={ImageIconblack}
                alt="Black Icon"
              />
              <h2>Vendors</h2>
              <p>Register as a feaster/vendor.</p>
              <img
                className="onboarding-image3"
                src={Circleiconvendor}
                alt=""
              />
            </article>
          </article>
        </section>
        <section className="onboarding-content4">
          <div className="onboarding-content4-container">
            <h2>Go back to home</h2>
            <img src={Leftarrow} alt="Left Arrow" />
          </div>
        </section>
      </section>
    </main>
  );
};

export default OnBoarding;
