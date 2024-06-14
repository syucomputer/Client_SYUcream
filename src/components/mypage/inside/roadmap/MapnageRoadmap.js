import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../Login/AuthContext";
import {useNavigate} from "react-router-dom";
import nav from "../../../Nav/Nav";

const ManageRoadmap = () => {
    const [option, setOption] = useState('')
    const [roadmaps, setRoadmaps] = useState([]);   // 저장된 전체 로드맵
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/board/roadmaps/${user.memId}`)
            .then(response => {
                console.log(response.data)

                setRoadmaps(response.data)
            })
            .catch(error => {
                console.log('로드맵 불러오기 실패', error)
            })
    }, []);

    return (
        <div>
            <div>
                <button onClick={() => navigate('/mypage/roadmap/1')}>x</button>
                로드맵 관리
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
            <table className="SubjectTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>로드맵 명</th>
                        <th>태그 교수님</th>
                        <th>검토 상태</th>
                        <th>생성 날짜</th>
                        <th>업데이트 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {roadmaps.map((roadmap, index) => (
                        <tr key={roadmap.id} onClick={() => navigate(`/mypage/roadmap/manage/${index + 1}`)}>
                            <td></td>
                            <td>{roadmap.title}</td>
                            <td>{roadmap.professorName} 교수님</td>
                            <td>{roadmap.reviewStatus}</td>
                            <td>{roadmap.creationDate}</td>
                            <td>{roadmap.lastUpdatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageRoadmap;