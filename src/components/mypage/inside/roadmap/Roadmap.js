import "./Roadmap.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Roadmap = ({ selectedRoadmapId }) => {
    const [roadmapDetail, setRoadmapDetail] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        relatedJob: "",
        jobDescription: "",
        neededSkill: "",
        plan: "",
        project: "",
        closingMent: ""
    });

    useEffect(() => {
        if (selectedRoadmapId) {
            fetchRoadmapDetail(selectedRoadmapId);
        }
    }, [selectedRoadmapId]);

    const fetchRoadmapDetail = (selectedRoadmapId) => {
        axios.get(`http://localhost:8080/board/roadmaps/detail/${selectedRoadmapId}`)
            .then(response => {
                setRoadmapDetail(response.data);
                setFormData({
                    relatedJob: response.data.relatedJob,
                    jobDescription: response.data.jobDescription,
                    neededSkill: response.data.neededSkill,
                    plan: response.data.plan,
                    project: response.data.project,
                    closingMent: response.data.closingMent
                });
            })
            .catch(error => {
                console.log('로드맵 상세조회 에러', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedRoadmap = {
            ...roadmapDetail,
            ...formData
        };

        axios.put(`http://localhost:8080/board/roadmaps/${selectedRoadmapId}`, updatedRoadmap)
            .then(response => {
                setRoadmapDetail(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.log('로드맵 수정 에러', error);
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            relatedJob: roadmapDetail.relatedJob,
            jobDescription: roadmapDetail.jobDescription,
            neededSkill: roadmapDetail.neededSkill,
            plan: roadmapDetail.plan,
            project: roadmapDetail.project,
            closingMent: roadmapDetail.closingMent
        });
    };

    return (
        <div>
            <div className="all-container">
                {roadmapDetail && (
                    <div>
                        <h1 style={{ textAlign: 'center' }}>{isEditing ? (
                            <input
                                type="text"
                                name="relatedJob"
                                value={formData.relatedJob}
                                onChange={handleInputChange}
                            />
                        ) : (
                            roadmapDetail.relatedJob
                        )}</h1>
                        <div style={{ padding: '0 40px' }}>{isEditing ? (
                            <textarea
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                            />
                        ) : (
                            roadmapDetail.jobDescription
                        )}</div>
                    </div>
                )}
                <div className="section">
                    <div className="add-container">
                        필요한 공부 및 기술
                    </div>
                    <ul className="content-box">
                        {isEditing ? (
                            <textarea
                                name="neededSkill"
                                value={formData.neededSkill}
                                onChange={handleInputChange}
                            />
                        ) : (
                            roadmapDetail?.neededSkill.split('\n').map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="section">
                    <div className="add-container">
                        3개월 학습계획
                    </div>
                    <ol className="content-box">
                        {isEditing ? (
                            <textarea
                                name="plan"
                                value={formData.plan}
                                onChange={handleInputChange}
                            />
                        ) : (
                            roadmapDetail?.plan.split('\n').map((plan, index) => (
                                <li key={index}>{plan}</li>
                            ))
                        )}
                    </ol>
                </div>
                <div className="section">
                    <div className="add-container">
                        추가적으로 도움이 되는 프로젝트
                    </div>
                    <ul className="content-box">
                        {isEditing ? (
                            <textarea
                                name="project"
                                value={formData.project}
                                onChange={handleInputChange}
                            />
                        ) : (
                            roadmapDetail?.project.split('\n').map((project, index) => (
                                <li key={index}>{project}</li>
                            ))
                        )}
                    </ul>
                </div>
                {/*{isEditing ? (*/}
                {/*    <textarea*/}
                {/*        name="closingMent"*/}
                {/*        value={formData.closingMent}*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <div style={{ padding: '0 40px', marginBottom: '20px' }}>{isEditing ? (*/}
                {/*        <textarea*/}
                {/*            name="closingMent"*/}
                {/*            value={formData.closingMent}*/}
                {/*            onChange={handleInputChange}*/}
                {/*        />*/}
                {/*    ) : (*/}
                {/*        roadmapDetail.closingMent*/}
                {/*    )}</div>*/}
                {/*)}*/}
            </div>
            {isEditing ? (
                <div>
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleCancel}>취소</button>
                </div>
            ) : (
                <button onClick={handleEdit}>수정하기</button>
            )}
        </div>
    );
};

export default Roadmap;
