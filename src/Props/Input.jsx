import React from "react";
import "./Css/Input.css";

const Input = (props) => {
  console.log(props);
  return (
    <input
      type={props.type || "text"}
      className={`input ${props.className || ""}`}
      placeholder={props.placeholder || ""}
      name={props.name}
      value={props.value ?? ""} // 🔥 IMPORTANT FIX
      onChange={props.onChange}
      style={{
        width: "100%",
        height: "50px",
        padding: "29px",
        fontSize: "16px",
        border: "1px solid #ccc",
        outline: "none",
      }}
    />
  );
};

export default Input;
