import React from 'react'

const Input = ({ type = "text", placeholder, value, onChange, className, icon, style }) => {
  return (
    <div className={`inp_group ${className || ""}`}>
      {icon && <span className="inp_icon">{icon}</span>}
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className="inp_field"
        style={style}
      />
    </div>
  )
}

export default Input