import React from "react";
import "./Trends.css";

const DescriptionBox = ({ title, description }) => {
  return (
    <div className="TextBox">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionBox;