import React, { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "../../../login/AuthContext";
import "./ChatRoom.css"

const ChatRoom = ({ selectedRoadmapId }) => {
  const [chat, setChat] = useState('');
  const [chatData, setChatData] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState([]);
  const [roadmapData, setRoadmapData] = useState({});
  const { user } = useAuth();

  // roadmapData가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    axios.get(`http://localhost:8080/board/roadmaps/detail/${selectedRoadmapId}`)
      .then(response => {
        setRoadmapData(response.data);
      })
      .catch(error => {
        console.log('로드맵 상세조회 에러', error);
      });
  }, [roadmapData.professorName]);

  useEffect(() => {
    if(selectedRoadmapId) {
      renderChat(selectedRoadmapId);
    }
  }, [selectedRoadmapId]);

  const renderChat = () => {
    if(roadmapData && roadmapData.professorName){
      axios.get(`http://localhost:8080/board/comment/roadmap/${selectedRoadmapId}`)
        .then(response => {
          console.log(response.data)
          setChatData(response.data);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleAddChat = () => {
    axios.post(`http://localhost:8080/board/comment/${selectedRoadmapId}`, {
      roadmapId: selectedRoadmapId,
      memberId: roadmapData.memberId,
      content: chat
    })
      .then(response => {
        setChat(response.data);
        renderChat(selectedRoadmapId); // 새로운 채팅을 추가한 후 채팅 목록을 다시 로드
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleReviewRequest = () => {
    if (!selectedProfessor) {
      alert("교수님을 선택해주세요.");
      return;
    }

    axios.patch(`/board/roadmaps/${selectedRoadmapId}/feedback`, {
      studentId: user.memId,
      professorName: selectedProfessor.name,
    })
      .then(response => {
        console.log('검토 요청 성공', response.data);

        // 선택된 교수님 정보를 상위 컴포넌트로 전달
        setRoadmapData({
          ...roadmapData,
          professorName: selectedProfessor.name,
        });
      })
      .catch(error => {
        console.log('검토 요청 실패', error);
      });
  };

  const professors = [
    { id: 1, name: "김현규", image: "/profile/Professor1.jpg" },
    { id: 2, name: "조충희", image: "/profile/Professor2.jpg" },
    { id: 3, name: "김성완", image: "/profile/Professor3.jpg" },
  ];

  return (
    <div>
      {roadmapData && (
        roadmapData.professorName ? (
          <div>
            <div className="chatContainer">
              <div className="chatBox">
                {chatData && chatData.map((chat, index) => (
                  <li key={index}>
                    <strong>{chat.memberId}</strong> : {chat.content}
                    <label>{chat.createdAt}</label>
                  </li>
                ))}
              </div>
              <div className="chatInputContainer">
                <input
                  type="text"
                  placeholder="댓글 달기..."
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  className="chatInput"
                />
                <button onClick={handleAddChat} className="chatButton">전송</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>교수님 선택</div>
            <div className="professor-list">
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className={`professor-item ${selectedProfessor.id === professor.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(professor)}
                >
                  <img src={professor.image} alt={professor.name} className="professor-image" />
                  <div>{professor.name}</div>
                </div>
              ))}
            </div>
            <button onClick={handleReviewRequest}>검토 요청</button>
          </div>
        )
      )}
    </div>
  )
}

export default ChatRoom;