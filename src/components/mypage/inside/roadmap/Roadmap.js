import Button from "../../../Button/Button";
import "./Roadmap.css"
import {useEffect, useState} from "react";
import axios from "axios";

const Roadmap = ({ setManage }) => {
    const [allRoadmaps, setAllRoadmaps] = useState([]);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState("");
    const [roadmapDetail, setRoadmapDetail] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/board/roadmaps`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)

                setAllRoadmaps(response.data.result);
            })
            .catch(error => {
                console.log('로드맵 리스트 조회 에러', error)
            })
    }, []);

    useEffect(() => {
        if (selectedRoadmapId) {
            axios.get(`http://localhost:8080/board/roadmaps/${selectedRoadmapId}`)
                .then(response => {

                    setRoadmapDetail(response.data.result)
                    console.log(response.data)
                })
                .catch(error => {
                    console.log('로드맵 상세조회 에러',error)
                })
        }
    }, [selectedRoadmapId]);

    const handleSelectChange = (e) => {
        setSelectedRoadmapId(e.target.value)
    }

    return (
        <div>
            <div>
                <select value={selectedRoadmapId} onChange={handleSelectChange}>
                    <option value="">로드맵 선택</option>
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
                        <h1>{roadmapDetail.name}</h1>
                        <div>{roadmapDetail.job_description}</div>
                    </div>
                )}
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            필요한 공부 및 기술
                        </div>
                    </div>
                    <ul className="content-box">
                        {/*{roadmapDetail && roadmapDetail.needed_skill.split('\n').map((skill, index) => (*/}
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