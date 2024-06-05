import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../../Login/AuthContext";

const ManageRoadmap = ({ setManage }) => {
    const [option, setOption] = useState('')
    const [roadmaps, setRoadmaps] = useState([]);
    const { user } = useAuth();

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
                <button onClick={setManage}>x</button>
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
                    <tr key={index}>
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