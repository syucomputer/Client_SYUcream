import React, { useState } from "react";
import styled from "styled-components";

const Checkbox = styled.label`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  background: ${(trends) => (trends.checked ? "#9370DB" : "#fff")};
  color: ${(trends) => (trends.checked ? "#fff" : "black")};
  cursor: pointer;
  font-size: 16px;
  //transition: all 0.3s ease-in-out;

  &:hover {
    background: #ddd;
  }

  input {
    position: absolute;
    visibility: hidden;
  }
`;

const TrendCheckbox = ({ selectedOption, setSelectedOption }) => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <label>
          옵션을 선택하세요
          <br />
        </label>
        <div>
          <Checkbox checked={selectedOption === "직무"}>
            <input
              type="checkbox"
              value="직무"
              checked={selectedOption === "직무"}
              onChange={handleOptionChange}
            />
            직무
          </Checkbox>
          <Checkbox checked={selectedOption === "기술스택"}>
            <input
              type="checkbox"
              value="기술스택"
              checked={selectedOption === "기술스택"}
              onChange={handleOptionChange}
            />
            기술스택
          </Checkbox>
          <Checkbox checked={selectedOption === "전문분야"}>
            <input
              type="checkbox"
              value="전문분야"
              checked={selectedOption === "전문분야"}
              onChange={handleOptionChange}
            />
            전문분야
          </Checkbox>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <label>기간을 선택하세요</label>
        <div>
          <Checkbox checked={selectedMonth === "1개월"}>
            <input
              type="checkbox"
              value="1개월"
              checked={selectedMonth === "1개월"}
              onChange={handleMonthChange}
            />
            1개월
          </Checkbox>
          <Checkbox checked={selectedMonth === "3개월"}>
            <input
              type="checkbox"
              value="3개월"
              checked={selectedMonth === "3개월"}
              onChange={handleMonthChange}
            />
            3개월
          </Checkbox>
          <Checkbox checked={selectedMonth === "6개월"}>
            <input
              type="checkbox"
              value="6개월"
              checked={selectedMonth === "6개월"}
              onChange={handleMonthChange}
            />
            6개월
          </Checkbox>
          <Checkbox checked={selectedMonth === "12개월"}>
            <input
              type="checkbox"
              value="12개월"
              checked={selectedMonth === "12개월"}
              onChange={handleMonthChange}
            />
            12개월
          </Checkbox>
        </div>
      </div>
      {selectedOption === "직무" && (
        <div style={{ marginTop: "30px" }}>
          <button
            className={`button ${active ? "active" : ""}`}
            onClick={handleClick}
          >
            그래프 보기
          </button>
        </div>
      )}

      {selectedOption === "전문분야" && (
        <div style={{ marginTop: "30px" }}>
          <button
            className={`button ${active ? "active" : ""}`}
            onClick={handleClick}
          >
            그래프 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendCheckbox;
