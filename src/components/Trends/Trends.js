import React from "react";
import Nav from "../Nav/Nav";
import Labelbox from "./Labelbox";
import TrendCheckbox from "./TrendCheckbox";
import TrendsTable from "./TrendsTable";
import "./Trends.css";

const Trends = () => {
  return (
    <div>
      <Nav /> {/* 헤더자리 임시로 Nav넣어 놓음 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Labelbox />
        <TrendCheckbox />
      </div>
      <TrendsTable />
    </div>
  );
};

export default Trends;
