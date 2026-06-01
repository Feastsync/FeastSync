import React from 'react'
import "./Css/Cards.css"
const WorkCard = (props) => {
  return (
    <div className="work_card_box">
      
      {props.icon && (
        <div className="work_card_icon_zone">
          {props.icon}
        </div>
      )}

      <div className="work_card_text_zone">
        <h4 className="work_card_item_title">{props.title}</h4>
        <p className="work_card_item_desc">{props.description}</p>
      </div>

    </div>
  )
}

export default WorkCard