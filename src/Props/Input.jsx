// import React from 'react'

// const Input = ({ type = "text", placeholder, value, onChange, className, icon, style }) => {
//   return (
//     <div className={`inp_group ${className || ""}`}>
//       {icon && <span className="inp_icon">{icon}</span>}
//       <input 
//         type={type} 
//         placeholder={placeholder} 
//         value={value} 
//         onChange={onChange} 
//         className="inp_field"
//         style={style}
//       />
//     </div>
//   )
// }

// export default Input
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
