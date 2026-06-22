import React from "react";
import "./Css/Input.css";

const Input = ({ className = "", type = "text", value, style, ...props }) => {
  return (
    <input
      {...props}
      type={type}
      className={`input ${className}`}
      value={value ?? ""}
      style={{
        width: "100%",
        height: "50px",
        padding: "29px",
        fontSize: "16px",
        border: "1px solid #ccc",
        outline: "none",
        ...style,
      }}
    />
  );
};

export default Input;
