import React, { useEffect, useState } from "react";
import data from "./TrendsData3.json";
import "./Trends.css";

const TrendsSpecialTable = ({ handleJobTitleClick }) => {
  const [trendsData, setTrendsData] = useState([]);

  useEffect(() => {
    setTrendsData(data.result.trends);
    const sortedData = data.result.trends.sort(
      (a, b) => b.postCount - a.postCount
    );
    setTrendsData(sortedData);
  }, []);

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
          {trendsData.map((trend, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td onClick={() => handleJobTitleClick(trend.description)}>
                {trend.jobTitle}
              </td>{" "}
              <td>{trend.postCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendsSpecialTable;
