import React, {useEffect, useState} from "react";
import "./Roadmap.css";
import axios from "axios";
import Button from "../Button/Button";
import {useAuth} from "../Login/AuthContext";
import ModalWindow from "../Modal/ModalWindow";
import Areas from "../Area/Areas";

const CreateRoadmap = () => {
  const [jobs, setJobs] = useState([])
  const [fields, setFields] = useState([])
  const [tech, setTech] = useState([])
  const [keywordList, setKeywordList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/member/keyword/all`, {
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
    axios.post(`/roadmaps/recommend-jobs`)
        .then(response => {
          console.log(response.data)
          setIsModalOpen(true)
        })
        .catch(error => {
          console.log("키워드 선택 완료 에러", error)
        })
  }

  const handlerCloseModal = () => {

  }
  return (
    <div className="roadmapBox">
      <h1>나의 로드맵 만들기</h1>
      <p>
        <strong>관심있는 키워드</strong>를 선택해주세요.
        선택된 키워드가 너무 많은 경우 정확한 추천이 어려울 수 있습니다.
      </p>
      <div className="screen">
        <div className="keywordList">
          <Areas label="직무/직업" list={jobs} onItemClick={handleItemClick} />
          <Areas label="전문분야" list={fields} onItemClick={handleItemClick} />
          <Areas label="기술스택" list={tech} onItemClick={handleItemClick} />
        </div>
        <div className="keywordConBox">
            {keywordList.map((selectedItem, index) => (
                <div key={index} className="SelectedItem">
                    {selectedItem.name}
                    <button className="remove" onClick={() => handleRemoveItem(selectedItem)}>x</button>
                </div>
            ))}
        </div>
      </div>
      <Button className="completeBtn" onClick={handleKeywordComplete} label="선택 완료" />
      <ModalWindow
        isOpen={isModalOpen}
        onRequestClose={handlerCloseModal}
        contentLabel="Modal"
      >
        {/*<Button className="" onClick={() => setIsModalOpen(false)} label="x" />*/}
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
