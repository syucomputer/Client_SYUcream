import React from "react";
import "./CheckBox.css";

const CheckBox = ({ value, label, onChange, checked , className }) => {
  const CBInput = "CBInput";
  return (
    <label className={`CheckContainer ${checked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
        className={`${CBInput} ${className}`}
      />
      {label}
    </label>
  )
}

export default CheckBox;