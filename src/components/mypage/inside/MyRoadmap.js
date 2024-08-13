import {useEffect, useState} from "react";
import Roadmap from "./roadmap/Roadmap";
import axios from "axios";
import {useAuth} from "../../login/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import "./MyInside.css"

const MyRoadmap = () => {
  const [roadmaps, setRoadmaps] = useState(null);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState("");
  const { roadmapId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/board/roadmaps/${user.memId}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        const roadmapData = response.data;

        setRoadmaps(roadmapData || []);
        if (roadmapData && roadmapData.length > 0) {
          const firstRoadmapId = roadmapId || roadmapData[0].id;
          setSelectedRoadmapId(firstRoadmapId);
        }
      })

      .catch(error => {
        console.log('로드맵 리스트 조회 에러', error)
      })
  }, []);

  const handleRoadmapChange = (e) => {
    const newRoadmapId = e.target.value;
    navigate(`/mypage/roadmap/${newRoadmapId}`);
    setSelectedRoadmapId(newRoadmapId); // 선택한 로드맵 ID 저장
  };

  return (
    <div className="my-roadmap-container">
      {!roadmaps ? (
        <div className="no-roadmap">
          <p>등록된 로드맵이 없습니다.</p>
          <button className="move-roadmap" onClick={() => navigate('/roadmap')}>
            로드맵 생성하기
          </button>
        </div>
      ) : (
        <>
          <div className="select-box">
            <select className="select" value={selectedRoadmapId} onChange={handleRoadmapChange}>
              {roadmaps.map(roadmap => (
                <option key={roadmap.id} value={roadmap.id}>
                  {`${roadmap.title} - ${roadmap.reviewStatus} - ${roadmap.professorName}`}
                </option>
              ))}
            </select>
            <button className="select-button" onClick={() => navigate('/mypage/roadmap/manage')}>
              <img src="/profile/icon/Content.jpg" className="content-img" alt="목차" />
              전체 로드맵
            </button>
          </div>
          <Roadmap selectedRoadmapId={selectedRoadmapId}/>
        </>
      )}
    </div>
  )
}

export default MyRoadmap;