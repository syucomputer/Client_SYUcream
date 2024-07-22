import React, { useState } from "react";
import "./RoadmapTable.css";
import Nav from "../nav/Nav";

const RoadMapTable = () => {
  const jobCheckBoxList = [
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
  ];
  const specialCheckBoxList = [
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
  ];
  const stackCheckBoxList = [
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
    "게임개발",
    "기술지원",
    "데이터분석가",
    "데이터엔지니어",
    "백엔스/서버개발",
    "보안관제",
    "보안컨설팅",
  ];

  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllSpecials, setShowAllSpecials] = useState(false);
  const [showAllStacks, setShowAllStacks] = useState(false);

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedSpecials, setSelectedSpecials] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);

  const handleCheckboxChange = (listType, item, isChecked) => {
    // listType에 따라 상태를 업데이트하는 로직
    if (listType === "job") {
      if (isChecked) {
        setSelectedJobs([...selectedJobs, item]);
      } else {
        setSelectedJobs(selectedJobs.filter((job) => job !== item));
      }
    } else if (listType === "special") {
      if (isChecked) {
        setSelectedSpecials([...selectedSpecials, item]);
      } else {
        setSelectedSpecials(
          selectedSpecials.filter((special) => special !== item)
        );
      }
    } else if (listType === "stack") {
      if (isChecked) {
        setSelectedStacks([...selectedStacks, item]);
      } else {
        setSelectedStacks(selectedStacks.filter((stack) => stack !== item));
      }
    }
  };

  // 각 분야별 '더보기' 버튼 클릭 핸들러
  const handleShowMoreJobs = () => {
    setShowAllJobs(!showAllJobs);
  };

  const handleShowMoreSpecials = () => {
    setShowAllSpecials(!showAllSpecials);
  };

  const handleShowMoreStacks = () => {
    setShowAllStacks(!showAllStacks);
  };
  // 초기 표시할 체크박스 개수
  const initialDisplayCount = 12;

  // 각 분야별로 표시할 체크박스 목록
  const displayedJobCheckBoxList = showAllJobs
    ? jobCheckBoxList
    : jobCheckBoxList.slice(0, initialDisplayCount);

  const displayedSpecialCheckBoxList = showAllSpecials
    ? specialCheckBoxList
    : specialCheckBoxList.slice(0, initialDisplayCount);

  const displayedStackCheckBoxList = showAllStacks
    ? stackCheckBoxList
    : stackCheckBoxList.slice(0, initialDisplayCount);

  function handleRemoveJob(jobToRemove) {
    setSelectedJobs(selectedJobs.filter((job) => job !== jobToRemove));
  }

  function handleRemoveSpecial(specialToRemove) {
    setSelectedSpecials(
      selectedSpecials.filter((special) => special !== specialToRemove)
    );
  }

  function handleRemoveStack(stackToRemove) {
    setSelectedStacks(
      selectedStacks.filter((stack) => stack !== stackToRemove)
    );
  }

  return (
    <div>
      <Nav />
      <div className="title">나의 로드맵 만들기</div>
      <div className="title2">
        <div className="span">관심있는 키워드</div>를 선택해주세요. 선택된
        키워드가 너무 많을 경우 정확한 추천이 어려울 수 있습니다.
      </div>
      <div className="all-container">
        <div className="RoadMap-form">
          <div className="container">
            <div className="text1">직무·직업</div>
            <div className="checkbox-container">
              {displayedJobCheckBoxList.map((item, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`job-${item}`}
                    className="checkbox-custom"
                    hidden
                    onChange={(e) =>
                      handleCheckboxChange("job", item, e.target.checked)
                    }
                  />
                  <label htmlFor={`job-${item}`} className="checkbox-label">
                    {item}
                  </label>
                </div>
              ))}
            </div>
            {!showAllJobs && (
              <div className="more-btn-container">
                <div className="line"></div>
                <button className="more-btn" onClick={handleShowMoreJobs}>
                  ▼더보기
                </button>
                <div className="line"></div>
              </div>
            )}
            <div className="text1">전문분야</div>
            <div className="checkbox-container">
              {displayedSpecialCheckBoxList.map((item, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`special-${item}`}
                    className="checkbox-custom"
                    hidden
                    onChange={(e) =>
                      handleCheckboxChange("special", item, e.target.checked)
                    }
                  />
                  <label htmlFor={`special-${item}`} className="checkbox-label">
                    {item}
                  </label>
                </div>
              ))}
            </div>
            {!showAllSpecials && (
              <div className="more-btn-container">
                <div className="line"></div>
                <button className="more-btn" onClick={handleShowMoreSpecials}>
                  ▼더보기
                </button>
                <div className="line"></div>
              </div>
            )}
            <div className="text1">기술스택</div>
            <div className="checkbox-container">
              {displayedStackCheckBoxList.map((item, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`stack-${item}`}
                    className="checkbox-custom"
                    hidden
                    onChange={(e) =>
                      handleCheckboxChange("stack", item, e.target.checked)
                    }
                  />
                  <label htmlFor={`stack-${item}`} className="checkbox-label">
                    {item}
                  </label>
                </div>
              ))}
            </div>
            {!showAllStacks && (
              <div className="more-btn-container">
                <div className="line"></div>
                <button className="more-btn" onClick={handleShowMoreStacks}>
                  ▼더보기
                </button>
                <div className="line"></div>
              </div>
            )}
          </div>
        </div>
        <div className="RoadMap-form2">
          <div className="yellow-box">등록된 정보 보기</div>
          <div>
            {selectedJobs.map((job, idx) => (
              <div key={idx} className="selected-custom">
                {job}
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => handleRemoveJob(job)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedSpecials.map((special, idx) => (
              <div key={idx} className="selected-custom">
                {special}
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => handleRemoveSpecial(special)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedStacks.map((stack, idx) => (
              <div key={idx} className="selected-custom">
                {stack}
                <button
                  type="button"
                  className="close-btn"
                  onclick={() => handleRemoveStack(stack)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMapTable;
