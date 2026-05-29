import React from 'react'
import "./Css/Button.css"

const Button = (props) => {
  return (
    <button className={`btn ${props.className}`}
    onClick={props.onClick}
    >
     {props.btnText}   
    </button>
  )
}

export default Button
