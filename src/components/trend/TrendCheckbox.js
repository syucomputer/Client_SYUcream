import React from "react";
import CheckBox from "../checkbox/CheckBox";
import Button from "../button/Button";

const TrendCheckbox = ({ selectedDivision, setSelectedDivision , selectedPeriod , setSelectedPeriod }) => {

  return (
    <div>
      <div className="TrendsCheckBox">
        <div>옵션을 선택하세요</div>
        <div>
          <CheckBox
            value="job"
            label="직무"
            onChange={e => setSelectedDivision(e.target.value)}
            checked={selectedDivision === "job"}
          />
          <CheckBox
            value="techstack"
            label="기술스택"
            onChange={e => setSelectedDivision(e.target.value)}
            checked={selectedDivision === "techstack"}
          />
          <CheckBox
            value="field"
            label="전문분야"
            onChange={e => setSelectedDivision(e.target.value)}
            checked={selectedDivision === "field"}
          />
        </div>
      </div>
      <div className="TrendsCheckBox">
        <div>기간을 선택하세요</div>
        <div>
          <CheckBox
            value="1month"
            label="1개월"
            onChange={e => setSelectedPeriod(e.target.value)}
            checked={selectedPeriod === "1month"}
          />
          <CheckBox
            value="3months"
            label="3개월"
            onChange={e => setSelectedPeriod(e.target.value)}
            checked={selectedPeriod === "3months"}
          />
          <CheckBox
            value="6months"
            label="6개월"
            onChange={e => setSelectedPeriod(e.target.value)}
            checked={selectedPeriod === "6months"}
          />
          <CheckBox
            value="12months"
            label="12개월"
            onChange={e => setSelectedPeriod(e.target.value)}
            checked={selectedPeriod === "12months"}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendCheckbox;
