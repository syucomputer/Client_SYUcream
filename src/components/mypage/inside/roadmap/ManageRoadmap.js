import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../login/AuthContext";
import {useNavigate} from "react-router-dom";
import BackButton from "../../../button/BackButton";
import "./MyRoadmap.css"

const ManageRoadmap = () => {
  const [option, setOption] = useState('')
  const [roadmaps, setRoadmaps] = useState([]);   // 저장된 전체 로드맵
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const backPoint = user.division === '학생' ? `${user.memId}` : 'professor';

    axios.get(`http://localhost:8080/board/roadmaps/${backPoint}`)
      .then(response => {
        setRoadmaps(response.data)
      })
      .catch(error => {
        console.log('로드맵 불러오기 실패', error)
      })
  }, []);

  return (
    <div className="manage-container">
      <div className="title-container">
        {user.division === '학생' &&
          <BackButton onClick={() => navigate(-1)} classname="" />
        }
        <label>전체 로드맵</label>
      </div>
      <div>
        <select
          className="short-form"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="날짜순">날짜순</option>
          <option value="학년순">학년순</option>
        </select>
      </div>
      <table className="roadmap-table">
        <thead>
          <tr>
            <th style={{ width: '30px' }}></th>
            <th>로드맵 명</th>
            {user.division === '학생' ? (
              <th>태그 교수님</th>
            ) : (
              <th>학생</th>
            )}
            <th>검토 상태</th>
            <th>생성 날짜</th>
            <th>업데이트 날짜</th>
          </tr>
        </thead>
        <tbody>
          {!roadmaps ?(
            <div>
              로드맵이 없습니다.
            </div>
          ) : (
            <>
              {roadmaps.map((roadmap) => (
                <tr
                  key={roadmap.id}
                  onClick={() => navigate(`/mypage/roadmap/manage/${roadmap.id}`)}
                >
                  <td></td>
                  <td>{roadmap.title}</td>
                  <td>{roadmap.professorName} 교수님</td>
                  <td>{roadmap.reviewStatus}</td>
                  <td>{roadmap.creationDate}</td>
                  <td>{roadmap.lastUpdatedAt}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageRoadmap;