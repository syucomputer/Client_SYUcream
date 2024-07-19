import React, {useState} from "react";
import "./KeywordButton.css";
import axios from "axios";
import {useAuth} from "../login/AuthContext";
import AreaComponent from "../area/AreaComponent";
import Button from "./Button";
import ModalWindow from "../modal/ModalWindow";

const KeywordButton = ({ id, label, onSelect, selected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState({});
  const { user } = useAuth();
  const handleClick = () => {
    if (!selected) {
      onSelect(prev => !prev); // select 상태 토글
    }

    axios.get(`http://localhost:8080/member/${user.memId}/keyword`)
      .then(response => {
        // 받아온 데이터를 원하는 형식으로 가공합니다.
        const keywords = [];
        response.data.job.forEach(keyword => keywords.push({ division: 'job', name: keyword }));
        response.data.field.forEach(keyword => keywords.push({ division: 'field', name: keyword }));
        response.data.techStack.forEach(keyword => keywords.push({ division: 'techstack', name: keyword }));
        setSelectedKeywords(keywords);
      })
      .catch(error => {
        console.log('관심 키워드 에러 : ', error)
      })
  };

  const handlerEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    const postData = {
      job: selectedKeywords.filter(item => item.division === 'job').map(item => item.name),
      field: selectedKeywords.filter(item => item.division === 'field').map(item => item.name),
      techStack: selectedKeywords.filter(item => item.division === 'techstack').map(item => item.name)
    };

    axios.put(`http://localhost:8080/member/${user.memId}/keyword`, postData)
      .then(response => {
        console.log('PUT 요청 성공:', postData, response.data);
        setSelectedKeywords(selectedKeywords);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('PUT 요청 실패:', error);
      });
  };

  return (
    <div>
      <div className={`round-button-wrapper ${selected ? 'not-selected' : 'selected'}`} onClick={handleClick}>
        <button
          className="round-button"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 막기
            handlerEdit(); // 수정하기 이벤트 핸들러 호출
          }}
        >
          <div className="inner-circle"/>
        </button>
        <div>
          <div className="recommendation-text">{label}
            {selected && id === "새로운정보" && (
                <label className="edit" onClick={handlerEdit}>수정하기</label>
            )
          }
          </div>
          {selected && id === "새로운정보" && (
            <div className="keywordBox">
              <div className="selectKeyword">
                <div className="selectKeyword">
                  {Array.isArray(selectedKeywords) && selectedKeywords.map((keyword, index) => (
                    <div key={index} className="SelectedItem">
                      {keyword.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
      >
        <h2>관심있는 키워드를 선택해주세요!</h2>
        <AreaComponent onSelectedItemsChange={setSelectedKeywords}/>
        <Button label="선택완료" className="selectButton" onClick={handleCloseModal}/>
      </ModalWindow>
    </div>
  );
}

export default KeywordButton;
