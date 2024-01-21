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
  // transition: all 0.3s ease-in-out;

  &:hover {
    background: #ddd;
  }

  input {
    position: absolute;
    visibility: hidden;
  }
`;

const TrendCheckbox = (trends) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMonth, setselectedMonth] = useState("");
  const [selectedStack, setSelectedStack] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMonthChange = (event) => {
    setselectedMonth(event.target.value);
  };

  const handleStackChange = (event) => {
    setSelectedStack(event.target.value);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <label>
        옵션을 선택하세요
        <br />
      </label>
      <div style={{ marginBottom: "30px" }}>
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
      </div>
      <div>
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
          {selectedOption === "기술스택" && (
            <div style={{ marginTop: "50px" }}>
              <label>분야를 선택하세요</label>
              <div>
                <Checkbox checked={selectedStack === "솔루션"}>
                  <input
                    type="checkbox"
                    value="솔루션"
                    checked={selectedStack === "솔루션"}
                    onChange={handleStackChange}
                  />
                  솔루션
                </Checkbox>
                <Checkbox checked={selectedStack === "네트워크"}>
                  <input
                    type="checkbox"
                    value="네트워크"
                    checked={selectedStack === "네트워크"}
                    onChange={handleStackChange}
                  />
                  네트워크
                </Checkbox>
                <Checkbox checked={selectedStack === "S/W"}>
                  <input
                    type="checkbox"
                    value="S/W"
                    checked={selectedStack === "S/W"}
                    onChange={handleStackChange}
                  />
                  S/W
                </Checkbox>
                <Checkbox checked={selectedStack === "클라우드"}>
                  <input
                    type="checkbox"
                    value="클라우드"
                    checked={selectedStack === "클라우드"}
                    onChange={handleStackChange}
                  />
                  클라우드
                </Checkbox>
                <Checkbox checked={selectedStack === "인프라"}>
                  <input
                    type="checkbox"
                    value="인프라"
                    checked={selectedStack === "인프라"}
                    onChange={handleStackChange}
                  />
                  인프라
                </Checkbox>
              </div>
              <div>
                <Checkbox checked={selectedStack === "API"}>
                  <input
                    type="checkbox"
                    value="API"
                    checked={selectedStack === "API"}
                    onChange={handleStackChange}
                  />
                  API
                </Checkbox>
                <Checkbox checked={selectedStack === "H/W"}>
                  <input
                    type="checkbox"
                    value="H/W"
                    checked={selectedStack === "H/W"}
                    onChange={handleStackChange}
                  />
                  H/W
                </Checkbox>
                <Checkbox checked={selectedStack === "빅데이터"}>
                  <input
                    type="checkbox"
                    value="빅데이터"
                    checked={selectedStack === "빅데이터"}
                    onChange={handleStackChange}
                  />
                  빅데이터
                </Checkbox>
                <Checkbox checked={selectedStack === "임베디드"}>
                  <input
                    type="checkbox"
                    value="임베디드"
                    checked={selectedStack === "임베디드"}
                    onChange={handleStackChange}
                  />
                  임베디드
                </Checkbox>
                <Checkbox checked={selectedStack === "정보통신"}>
                  <input
                    type="checkbox"
                    value="정보통신"
                    checked={selectedStack === "정보통신"}
                    onChange={handleStackChange}
                  />
                  정보통신
                </Checkbox>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendCheckbox;
