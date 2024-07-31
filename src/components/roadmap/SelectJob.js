import React, {useState} from "react";
import Button from "../button/Button";
import "./CreateRoadmap.css"
import ModalWindow from "../modal/ModalWindow";
import {useLocation} from "react-router-dom";

const SelectJob = () => {
  const [isModal, setIsModal] = useState(false);
  const [createTime, setCreateTime] = useState(true);
  const location = useLocation();
  const { jobList } = location.state || {};  // location.state가 존재하면 jobs를 가져옴

  const handleCreate = () => {

  }

  return (
    <div className="SelectJobContainer">
      {console.log(jobList)}
      <h1>나의 로드맵 만들기</h1>
      <p>
        관심 키워드를 바탕으로 추천드리는 직무입니다.
        <strong>관심있는 직무 선택</strong>하여 <strong>로드맵을 만들어보세요!</strong>
      </p>
      <div className="JobContainer">
        <div className="JobBox">
          <h2>게임 개발자</h2>
          <label>관련 키워드 : 게임개발, .NET, 네트워크</label>
          <p>
            게임 개발은 .NET과 같은 프로그래밍 언어와 네트워킹 지식을 필요로 합니다.
            당신의 관심이 게임개발에 있으며, 필요한 기술 스택을 보유하고 있습니다.
          </p>
        </div>
        <div className="JobBox">
          <h2>데이터 엔지니어</h2>
          <label>관련 키워드 : 게임개발, .NET, 네트워크</label>
          <p>
            게임 개발은 .NET과 같은 프로그래밍 언어와 네트워킹 지식을 필요로 합니다.
            당신의 관심이 게임개발에 있으며, 필요한 기술 스택을 보유하고 있습니다.
          </p>
        </div>
        <div className="JobBox">
          <h2>게임 개발자</h2>
          <label>관련 키워드 : 게임개발, .NET, 네트워크</label>
          <p>
            게임 개발은 .NET과 같은 프로그래밍 언어와 네트워킹 지식을 필요로 합니다.
            당신의 관심이 게임개발에 있으며, 필요한 기술 스택을 보유하고 있습니다.
          </p>
        </div>
        <div className="JobBox">
          <h2>데이터 엔지니어</h2>
          <label>관련 키워드 : 게임개발, .NET, 네트워크</label>
          <p>
            게임 개발은 .NET과 같은 프로그래밍 언어와 네트워킹 지식을 필요로 합니다.
            당신의 관심이 게임개발에 있으며, 필요한 기술 스택을 보유하고 있습니다.
          </p>
        </div>
      </div>
      <Button label="로드맵 생성하기" onClick={() => setIsModal(true)} className="CreateButton" />
      <ModalWindow
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
        contentLabel="Modal"
      >
        <Button className="ModalCloseButton" onClick={() => setIsModal(false)} label="x" />
        {createTime ?
          (
            <div>
              <div className="DataLabel">
                <strong>목표 달성 기간</strong>을 선택해주세요!
              </div>
              <div className="DateContainer">
                <div className="DateBox">
                  <Button label="1개월" className="DateButton" />
                  <Button label="3개월" className="DateButton" />
                  <Button label="6개월" className="DateButton" />
                  <Button label="12개월" className="DateButton" />
                </div>
                <Button label="맞춤형 로드맵 생성하기" onClick={() => setCreateTime(false)} className="CreateRoadmapButton"  />
              </div>
            </div>
          ) : (
            <div>
              <div className="DataLabel">
                <strong>로드맵</strong> 생성 중
              </div>
              <pre>
                저장한 로드맵은
                <strong>학과 교수님</strong>의 <strong>피드백</strong>을 통해
                더 정교하게 완성시켜보세요!
              </pre>
            </div>
          )
        }
      </ModalWindow>
    </div>
  )
}

export default SelectJob;