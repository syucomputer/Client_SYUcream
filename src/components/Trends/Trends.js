import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Labelbox from "./Labelbox";
import TrendCheckbox from "./TrendCheckbox";
import TrendsJobTable from "./TrendsJobTable";
import TrendsStackTable from "./TrendsStackTable";
import TrendsSpecialTable from "./TrendsSpecialTable";
import DescriptionBox from "./Descriptionbox";

import data1 from "./TrendsData1.json";
import data2 from "./TrendsData2.json";

import "./Trends.css";

const Trends = () => {
  const [selectedOption, setSelectedOption] = React.useState("직무");
  const [trendsData, setTrendsData] = useState([]);
  const [description, setDescription] = useState(
    "직무명을 클릭하면 설명을 확인할 수 있어요."
  );

  useEffect(() => {
    if (selectedOption === "직무") {
      setTrendsData(data1.result.trends);
    } else if (selectedOption === "기술스택") {
      setTrendsData(data2.result.trends);
    }
  }, [selectedOption]);

  const handleJobTitleClick = (description) => {
    setDescription(description);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
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
          width: "95%",
        }}
      >
        {selectedOption === "직무" ? (
          <TrendsJobTable
            trendsData={trendsData}
            handleJobTitleClick={handleJobTitleClick}
          />
        ) : selectedOption === "기술스택" ? (
          <TrendsStackTable
            trendsData={trendsData}
            handleJobTitleClick={handleJobTitleClick}
          />
        ) : (
          <TrendsSpecialTable
            trendsData={trendsData}
            handleJobTitleClick={handleJobTitleClick}
          />
        )}
        <DescriptionBox description={description} />
      </div>
    </div>
  );
};

export default Trends;
