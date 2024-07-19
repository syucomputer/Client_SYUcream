import "./MyRoadmap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../button/Button";

const Roadmap = ({ selectedRoadmapId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [roadmapDetail, setRoadmapDetail] = useState(null);   // 현재 로드맵
  const [formData, setFormData] = useState({             // 전체적인 로드맵
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
    axios.get(`/board/roadmaps/detail/${selectedRoadmapId}`)
      .then(response => {
        const roadmap = response.data;

        setRoadmapDetail(roadmap);
        setFormData({
          relatedJob: roadmap.relatedJob,
          jobDescription: roadmap.jobDescription,
          neededSkill: roadmap.neededSkill,
          plan: roadmap.plan,
          project: roadmap.project,
          closingMent: roadmap.closingMent
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
      ...formData,
    };

    axios.put(`/board/roadmaps/${selectedRoadmapId}`, updatedRoadmap)
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
        <div className="AllContainer">
          {roadmapDetail && (
            <div>
              <h1 style={{ textAlign: 'center' }}>
                {isEditing ? (
                  <textarea
                      name="relatedJob"
                      value={formData.relatedJob}
                      onChange={handleInputChange}
                  />
                ) : (
                  roadmapDetail.relatedJob
                )}
              </h1>
              <div style={{ padding: '0 40px' }}>
                {isEditing ? (
                  <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                  />
                ) : (
                  roadmapDetail.jobDescription
                )}
              </div>
            </div>
          )}
            <div className="Section">
              {console.log(roadmapDetail?.neededSkill)}
              <div className="AddContainer">
                필요한 공부 및 기술
              </div>
              <ul className="ContentBox">
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
            <div className="Section">
              <div className="AddContainer">
                3개월 학습계획
              </div>
              <div className="ContentBox">
                {isEditing ? (
                  <textarea
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                  />
                ) : (
                  <ol>
                    {roadmapDetail?.plan.split('\n').map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
            <div className="Section">
              <div className="AddContainer">
                추가적으로 도움이 되는 프로젝트
              </div>
              <div className="ContentBox">
                {isEditing ? (
                  <textarea
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                  />
                ) : (
                  <ol>
                    {roadmapDetail?.project.split('\n').map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          {roadmapDetail && (
            <div style={{ padding: '0 40px' }}>
              {isEditing ? (
                <textarea
                  name="closingMent"
                  value={formData.closingMent}
                  onChange={handleInputChange}
                />
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  {isEditing ? (
                    <textarea
                      name="closingMent"
                      value={formData.closingMent}
                      onChange={handleInputChange}
                    />
                  ) : (
                    roadmapDetail.closingMent
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {isEditing ? (
          <div>
            <Button label="저장" onClick={handleSave} />
            <Button label="취소" onClick={handleCancel} />
          </div>
        ) : (
          <Button label="수정하기" onClick={handleEdit} />
        )}
    </div>
  );
};

export default Roadmap;
