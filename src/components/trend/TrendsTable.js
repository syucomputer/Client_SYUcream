import React from "react";
import "./Trends.css";

const TrendsTable = ({ selectedDivision, trendsData, handleJobTitleClick }) => {
  const handleName = () => {
    switch (selectedDivision) {
      case 'job':
        return '직무명';
      case 'techstack':
        return '기술스택';
      case 'field':
        return '전문분야';
      default:
        return '직무명';
    }
  };

  return (
    <div className="TrendsTableContainer">
      <table className="TrendsTable">
        <thead>
        <tr>
          <th>순위</th>
          <th>{handleName()}</th>
          <th>공고수</th>
        </tr>
        </thead>
        <tbody>
        {trendsData && trendsData.map((trend, index) => (
          <tr key={index} onClick={() => handleJobTitleClick(trend.name)}>
            <td>{index + 1}</td>
            <td>{trend.name}</td>
            <td>{trend.frequency}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendsTable;
