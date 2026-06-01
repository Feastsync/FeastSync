import { stepsData } from "../DummyData"
import "./Css/HowItWorks.css"

const HowItWorks = () => {

  return (
    <section className="hiw_sec">
      <div className="hiw_container">
        <div className="hiw_header">
          <h2 className="hiw_main_title">HOW IT WORKS</h2>
          <p className="hiw_subtitle">The platform operates on a three-way pillar: Transparency, Security, and Seamlessness.</p>
        </div>

        <div className="hiw_grid">
          {stepsData.map((step) => (
            <div className="hiw_item_pair" key={step.id}>
              <div className="hiw_icon_box">
                <img src={step.icon} alt={step.title} className="hiw_logo_img" />
              </div>
              <div className="hiw_text_card">
                <h4 className="hiw_card_title">{step.title}</h4>
                <p className="hiw_card_desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks