import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Signup.css"
import {StudentIdContext} from "./StudentIdContext";

const Course = () => {
  const { studentId } = useContext(StudentIdContext);

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      upLoadSubjects(studentId);
    }
  }, [studentId]);

  const upLoadSubjects = (studentId) => {
      // 수강 과목을 불러오는 요청을 보냅니다.
    axios.get(`http://localhost:8080/subject/user/${studentId}`)
      .then((response) => {
        console.log(response.data);
        // 응답 데이터의 구조를 확인하여 존재하는지 확인
        if (response.status === 200) {
          const subjectData = response.data.results.subject;

          // 상태 업데이트
          setSubjectData(subjectData);
          setLoading(false)
          setComplete(true)
        } else {
          // 수강과목 데이터가 없는 경우 또는 구조가 예상과 다른 경우
          console.error("수강과목 데이터가 없거나 잘못된 형식입니다.");
        }
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
        setLoading(false);
      });
  };

  const handlerNext = () => {
      navigate('/login');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>수강 과목 불러오기</h2>
      <div>
        사이트 이용을 위한 수강과목을 불러와주세요! <br/>
        해당 정보는 강좌추천, 로드맵 추천 등 사이트 이용에 이용됩니다.
      </div>
      {loading ? (
        <div>
          <div className="box boxSpinner">
            <div className="spinner"></div>
            <div>
              사이트 이용을 위한 수강과목을 불러오는 중입니다...
            </div>
          </div>
        </div>
        ) : (complete ? (
          <div className="successMessage">
            <div className="box">
              <div>
                {subjectData && subjectData.map((subject) => (
                  <ul key={subject.subjectId}>
                    <li>{subject.completeYear}년 {subject.completeTerm}</li>
                  </ul>
                ))}
              </div>
            </div>
            <button className="next" onClick={handlerNext}> 서비스 시작하기 </button>
          </div>
        ) : (
          <div>
            <div className="box"></div>
            <button className="ButtonPull" onClick={() => upLoadSubjects(studentId)}>
              초기 설정 완료하고 서비스 시작하기
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Course;
