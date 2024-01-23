import React from "react";
import Nav from "../Nav/Nav";
import Labelbox from "./Labelbox";
import TrendCheckbox from "./TrendCheckbox";
import TrendsTable from "./TrendsTable";
import TrendsStackTable from "./TrendsStackTable";

import "./Trends.css";

const Trends = () => {
  const [selectedOption, setSelectedOption] = React.useState("직무");

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Labelbox />
        <TrendCheckbox
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedOption === "직무" ? <TrendsTable /> : <TrendsStackTable />}
      </div>
    </div>
  );
};

export default Trends;
