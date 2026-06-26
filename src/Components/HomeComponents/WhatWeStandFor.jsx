import React from 'react'
import Button from '../../Props/Button'
import "./Css/WhatWeStandFor.css"
import { features } from '../DummyData'

const WhatWeStandFor = () => {
  return (
    <section className="wwsf_sec">
      <div className="wwsf_container">

        <div className="wwsf_header">
          <h2 className="wwsf_title">WHAT WE STAND FOR</h2>
          <p className="wwsf_subtitle">
            A dedicated platform for professional entertainment ecosystems. Discover top-tier event entertainers and
            Choose FeastSync for secure, transparent, and seamless bookings.
          </p>
        </div>

        <div className="wwsf_grid">
          {features.map((feature) => (
            <Button
              key={feature.id}
              className="wwsf_pill"
              btnText={
                <span className="wwsf_pill_inner">
                  <img src={feature.icon} alt={feature.label} className="wwsf_icon" />
                  <span className="wwsf_label">{feature.label}</span>
                </span>
              }
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatWeStandFor