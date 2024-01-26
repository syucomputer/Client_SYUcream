import React, { useEffect, useState } from "react";
import data from "./TrendsData2.json";
import "./Trends.css";

const TrendsTable = () => {
  const [trendsData, setTrendsData] = useState([]);
  const [description, setDescription] = useState(
    "직무명을 클릭하면 설명을 확인할 수 있어요."
  );

  useEffect(() => {
    setTrendsData(data.result.trends);
  }, []);

  const handleJobTitleClick = (description) => {
    setDescription(description);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>순위</th>
            <th>직무명</th>
            <th>공고수</th>
          </tr>
        </thead>
        <tbody>
          {trendsData.map((trend) => (
            <tr key={trend.rank}>
              <td>{trend.rank}</td>
              <td onClick={() => handleJobTitleClick(trend.description)}>
                {trend.jobTitle}
              </td>{" "}
              <td>{trend.postCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <textarea className="textbox" readOnly value={description}></textarea>
    </div>
  );
};

export default TrendsTable;
