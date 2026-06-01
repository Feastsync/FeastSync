
import React from 'react'
import "./Css/Input.css"

const Input = (props) => {
  return (
    <input type={props.type} 
    className={`input ${props.className}`}
    placeholder={props.placeholder}
    />
  )
}

export default Input
