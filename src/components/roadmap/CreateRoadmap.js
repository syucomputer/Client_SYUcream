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
    const isItemAlreadySelected = keywordList.some(selectedItem => selectedItem.name === item.name && selectedItem.division === item.division);

    const updatedItems = isItemAlreadySelected
      ? keywordList.filter(selectedItem => !(selectedItem.name === item.name && selectedItem.division === item.division))
      : [...keywordList, item];
    setKeywordList(updatedItems);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = keywordList.filter(selectedItem => !(selectedItem.name === item.name && selectedItem.division === item.division));
    setKeywordList(updatedItems);
  };

  const handleKeywordComplete = () =>{
    setIsModalOpen(true)

    // axios.post(`/roadmaps/recommend-jobs`)
    //   .then(response => {
    //     console.log(response.data)
    //     setIsModalOpen(true)
    //   })
    //   .catch(error => {
    //     console.log("키워드 선택 완료 에러", error)
    //   })
  }

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        navigate('jobs');
      }, 3000); // 3 seconds
    }
  }, [isModalOpen]);

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
          {keywordList.map((selectedItem, index) => (
            <div key={index} className="selected-item">
              {selectedItem.name}
              <button className="remove" onClick={() => handleRemoveItem(selectedItem)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <Button className="complete-button" onClick={handleKeywordComplete} label="선택 완료" />
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handlerCloseModal}
        contentLabel="Modal"
      >
        <Button className="" onClick={() => setIsModalOpen(false)} label="x" />
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