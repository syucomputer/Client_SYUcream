import React from "react";
import "./Trends.css";

const DescriptionBox = ({ description }) => {
  return <textarea className="TextBox" readOnly>{description}</textarea>;
};

export default DescriptionBox;
