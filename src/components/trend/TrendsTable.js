import React from "react";
import "./Trends.css";

const TrendsTable = ({ selectedDivision, trendsData }) => {
  const handleName = () => {
    switch (selectedDivision) {
      case 'job':
        return '직무명'
      case 'techstack':
        return '기술스택'
      case 'field':
        return '전문분야'
      default:
        return '직무명'
    }
  }

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
          /*
            클릭했을 때 오른쪽에 직무, 기술스택, 전문분야에 대한 내용
            <tr onClick={() => handleJobTitleClick(trend.description)}>
          */
            <tr key={index}>
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
