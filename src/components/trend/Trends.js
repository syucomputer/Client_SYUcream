import React, { useEffect, useState } from "react";
import axios from "axios";
import TrendsTable from "./TrendsTable";
import TrendCheckbox from "./TrendCheckbox";
import DescriptionBox from "./DescriptionBox";
import "./Trends.css";

const Trends = () => {
  const [selectedDivision, setSelectedDivision] = useState("job");
  const [selectedPeriod, setSelectedPeriod] = useState("1month")
  const [trendsData, setTrendsData] = useState([]);
  const date = new Date();

  useEffect(() => {
    axios.get(`/keywords/${selectedDivision}/${selectedPeriod}`)
      .then(response => {
        const rankingArray = Object.values(response.data?.ranking);

        setTrendsData(rankingArray)
      })
      .catch(error => {
        console.log("직무별 순위 조회", error)
      })
  }, [selectedDivision, selectedPeriod]);

  // const [description, setDescription] = useState(
  //   "직무명을 클릭하면 설명을 확인할 수 있어요."
  // );
  // const handleJobTitleClick = (description) => {
  //   setDescription(description);
  // };

  const selectDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      return `${y}.${m < 10 ? '0' + m : m}`;
    };

    let startDate = new Date(year, month - 1); // 현재 날짜
    let endDate = new Date(startDate);

    switch (selectedPeriod) {
      case '1month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '12months':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }

    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };


  return (
    <div className="TrendsContainer">
      <div className="TrendsBox">
        <div className="TrendTitle">
          <h1> 최신동향 </h1>
          <div>
            이 페이지에서는 사용자가 설정한 기간에 대해 <br/>
            직무와 기술스택의 순위를 차트로 확인할 수 있습니다. <br/>각 직무나
            기술스택을 클릭하면 해당 분야에 대한 상세 설명이 나타나며, <br/>이
            정보를 활용하여 현재 시장에서 가장 수요가 많은 기술과 역량을 파악할 수
            있습니다.
          </div>
        </div>
        <div className="TrendsBody">
          <div className="Center Date">{selectDate()}</div>
          <TrendsTable
            selectedDivision={selectedDivision}
            trendsData={trendsData}/>
        </div>
      </div>
      <div className="TrendsBox">
        <TrendCheckbox
          selectedDivision={selectedDivision}
          setSelectedDivision={setSelectedDivision}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <DescriptionBox description={"직무명을 클릭하면 설명을 확인할 수 있어요."}/>
      </div>
    </div>
  );
};

export default Trends;
