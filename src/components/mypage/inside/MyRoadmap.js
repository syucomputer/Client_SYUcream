import {useEffect, useState} from "react";
import Roadmap from "./roadmap/Roadmap";
import axios from "axios";
import {useAuth} from "../../Login/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../Button/Button";
import "./MyInside.css"

const MyRoadmap = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState("");
    const { roadmapId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/board/roadmaps/${user.memId}`, {
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
        <div className="myRoadmap-container">
            <div className="selectBox">
                <select className="select" value={selectedRoadmapId} onChange={handleRoadmapChange}>
                    {roadmaps.map(roadmap => (
                        <option key={roadmap.id} value={roadmap.id}>
                            {`${roadmap.title} - ${roadmap.reviewStatus} - ${roadmap.professorName}`}
                        </option>
                    ))}
                </select>
                <Button label="전체 로드맵" className="selectBtn" onClick={() => navigate('/mypage/roadmap/manage')}/>
            </div>
            <Roadmap selectedRoadmapId={selectedRoadmapId} />
        </div>
    )
}

export default MyRoadmap;