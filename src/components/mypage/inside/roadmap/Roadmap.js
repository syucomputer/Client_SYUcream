import Button from "../../../Button/Button";
import "./Roadmap.css"
import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../../Login/AuthContext";

const Roadmap = ({ setManage }) => {
    const [allRoadmaps, setAllRoadmaps] = useState([]);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState("");
    const [roadmapDetail, setRoadmapDetail] = useState(null);
    const { user } = useAuth();
    const { roadmapId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/board/roadmaps/${user.memId}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                const roadmapData = response.data;

                setAllRoadmaps(roadmapData || []);
                if (roadmapData && roadmapData.length > 0) {
                    const firstRoadmapId = roadmapId || roadmapData[0].id;
                    setSelectedRoadmapId(firstRoadmapId);
                    navigate(`/mypage/roadmap/${firstRoadmapId}`);
                }
            })

            .catch(error => {
                console.log('로드맵 리스트 조회 에러', error)
            })
    }, []);

    useEffect(() => {
        if (selectedRoadmapId) {
            fetchRoadmapDetail(selectedRoadmapId);
        }
    }, [selectedRoadmapId]);

    const fetchRoadmapDetail = (selectedRoadmapId) => {
        axios.get(`http://localhost:8080/board/roadmaps/detail/${selectedRoadmapId}`)
            .then(response => {
                setRoadmapDetail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log('로드맵 상세조회 에러', error);
            });
    };

    const handleRoadmapChange = (e) => {
        const newRoadmapId = e.target.value;
        navigate(`/mypage/roadmap/${newRoadmapId}`);
        setSelectedRoadmapId(newRoadmapId); // 선택한 로드맵 ID 저장
    };

    return (
        <div>
            <div>
                <select value={selectedRoadmapId} onChange={handleRoadmapChange}>
                    {allRoadmaps.map(roadmap => (
                        <option key={roadmap.id} value={roadmap.id}>
                            {roadmap.title}
                        </option>
                    ))}
                </select>
                <Button label="로드맵 관리" className="" onClick={setManage}/>
            </div>
            <div className="all-contatiner">
                {roadmapDetail && (
                    <div>
                        <h1>{roadmapDetail.relatedJob}</h1>
                        <div>{roadmapDetail.jobDescription}</div>
                    </div>
                )}
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            필요한 공부 및 기술
                        </div>
                    </div>
                    <ul className="content-box">
                        {/*{roadmapDetail && roadmapDetail.neededSkill.split('\n').map((skill, index) => (*/}
                        {/*    <li key={index}>{skill}</li>*/}
                        {/*))}*/}
                    </ul>
                </div>
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            3개월 학습계획
                        </div>
                    </div>
                    <ol className="content-box">
                        <li>기초 지식 : 과학 및 정보 기술의 기본적인 이해</li>
                        <li>네트워킹 지식 :</li>
                        <li>운영 체제 :</li>
                        <li>하드웨어 지식 :</li>
                        <li>보안 지식 :</li>
                        <li>문제 해결 능력 :</li>
                        <li>인증 :</li>
                    </ol>
                </div>
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            추가적으로 도움이 되는 프로젝트
                        </div>
                    </div>
                    <ul className="content-box">
                        <li>홈 네트워크 설정 : 과학 및 정보 기술의 기본적인 이해</li>
                        <li>가상화 프로젝트 :</li>
                        <li>보안 구현 프로젝트 :</li>
                        <li>오픈 소스 프로젝트 참여 :</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Roadmap;