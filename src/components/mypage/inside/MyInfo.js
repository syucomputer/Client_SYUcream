import Button from "../../button/Button";
import ModalWindow from "../../modal/ModalWindow";
import AreaComponent from "../../area/AreaComponent";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../login/AuthContext";
import axios from "axios";
import MySubject from "./subject/MySubject";
import "./MyInside.css"

const MyInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState({});
    const { user } = useAuth();

    // 사용자의 관심있는 키워드 불러오기
    useEffect(() => {
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
    }, [user.memId]);

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
        console.log(response.data)
        setSelectedKeywords(selectedKeywords);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('PUT 요청 실패:', error);
      });
  };

  return (
    <div className="info-container">
      <div>
        <h1>나의 정보 관리</h1>
        <div className="keyword-container">
          <div className="keyword">
            <label>나의 관심 키워드</label>
            <Button label="수정하기" className="keyword-edit" onClick={handlerEdit}/>
          </div>
          <div className="select-keyword">
            {Array.isArray(selectedKeywords) && selectedKeywords.map((keyword, index) => (
              <div key={index} className="selected-item">
                {keyword.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      {user.division === '학생' && <MySubject/>}
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="keyword-modal"
        contentLabel="Modal"
      >
        <div>
          <h2>관심있는 키워드를 선택해주세요!</h2>
          <Button className="modal-button" onClick={() => setIsModalOpen(false)} label="x" />
        </div>
        <AreaComponent onSelectedItemsChange={setSelectedKeywords}/>
        <Button label="선택완료" className="select-button" onClick={handleCloseModal}/>
      </ModalWindow>
    </div>
  )
}

export default MyInfo;