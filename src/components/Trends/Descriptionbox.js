import React from "react";
import "./Trends.css";

const DescriptionBox = ({ description }) => {
  return <textarea className="textbox" readOnly value={description}></textarea>;
};

export default DescriptionBox;
