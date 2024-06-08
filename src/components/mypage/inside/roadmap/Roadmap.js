import "./Roadmap.css"
import {useEffect, useState} from "react";
import axios from "axios";

const Roadmap = ({ selectedRoadmapId }) => {
    const [roadmapDetail, setRoadmapDetail] = useState(null);

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

    return (
        <div>
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