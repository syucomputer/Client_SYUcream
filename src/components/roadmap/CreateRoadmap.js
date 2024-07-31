import React, {useEffect, useState} from "react";
import "./CreateRoadmap.css";
import axios from "axios";
import Button from "../button/Button";
import {useAuth} from "../login/AuthContext";
import ModalWindow from "../modal/ModalWindow";
import Areas from "../area/Areas";
import {useNavigate} from "react-router-dom";

const CreateRoadmap = () => {
  const [jobs, setJobs] = useState([])
  const [fields, setFields] = useState([])
  const [tech, setTech] = useState([])
  const [keywordList, setKeywordList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/member/keyword/all`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        const jobs = response.data.filter(item => item.division === 'job');
        const fields = response.data.filter(item => item.division === 'field');
        const techstacks = response.data.filter(item => item.division === 'techstack');

        setJobs(jobs);
        setFields(fields);
        setTech(techstacks);
      })
      .catch(error => {
        console.log("키워드 리스트 에러", error)
      })
  }, []);

  const handleItemClick = (item) => {
    const isItemAlreadySelected = keywordList.includes(item.name);
    let updatedKeywords;

    if (isItemAlreadySelected) {
      // 이미 선택된 항목이면 제거
      updatedKeywords = keywordList.filter(keyword => keyword !== item.name);
    } else {
      // 새로운 항목이면 추가
      updatedKeywords = [...keywordList, item.name];
    }
    setKeywordList(updatedKeywords);
  };

  const handleRemoveItem = (keyword) => {
    const updatedKeywords = keywordList.filter(item => item !== keyword);
    setKeywordList(updatedKeywords);
  };

  const handleKeywordComplete = () =>{
    setIsModalOpen(true)

    axios.post(`http://localhost:8080/roadmaps/recommend-jobs`, {
      keywords: keywordList
    })
      .then(response => {
        setJobList(response.data)
        setIsModalOpen(false)

        navigate('jobs',{ state: { jobList: response.data } })
      })
      .catch(error => {
        console.log("키워드 선택 완료 에러", error)
      })
  }

  const handlerCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="roadmap-box">
      <h1>나의 로드맵 만들기</h1>
      <p>
        <strong>관심있는 키워드</strong>를 선택해주세요.
        선택된 키워드가 너무 많은 경우 정확한 추천이 어려울 수 있습니다.
      </p>
      <div className="screen">
        <div className="keyword-list">
          <Areas VisibleItemCount="10" label="직무/직업" list={jobs} onItemClick={handleItemClick} />
          <Areas VisibleItemCount="10" label="전문분야" list={fields} onItemClick={handleItemClick} />
          <Areas VisibleItemCount="10" label="기술스택" list={tech} onItemClick={handleItemClick} />
        </div>
        <div className="keyword-container-box">
          {keywordList.map((keyword, index) => (
            <div key={index} className="selected-item">
              {keyword}
              <button className="remove" onClick={() => handleRemoveItem(keyword)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <Button className="complete-button" onClick={handleKeywordComplete} label="선택 완료"/>
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handlerCloseModal}
        className="roadmap-modal"
        contentLabel="Modal"
      >
        <Button className="modal-button" onClick={() => setIsModalOpen(false)} label="x" />
        <p>
          <strong>맞춤형 분야</strong> 찾는 중
        </p>
        {user &&
          <pre>
            <strong>{user.name}</strong>님께
            적절한 분야를 찾고 있습니다!
          </pre>
        }
      </ModalWindow>
    </div>
  );
};

export default CreateRoadmap;