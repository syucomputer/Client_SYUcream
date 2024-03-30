import React, {useEffect, useState} from "react";
import Button from "../Button/Button";
import "./Course.css"
// import data from "./testData.json"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Course = ({ studentId, onStepChange }) => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (studentId) {
            fetchSubjects(studentId);
        }
    }, [studentId]);

    const fetchSubjects = (studentId) => {
        setLoading(true);
        // 수강 과목을 불러오는 요청을 보냅니다.
        axios.get(`http://localhost:8080/user/${studentId}`)
            .then((response) => {
                const mySubjectData = response.data.results?.subjects;

                setSubjectData(mySubjectData);
                console.log(mySubjectData);

                // console.log(response.result);
                // console.log(response.data);
                // console.log(subjectsData); // 로그로 데이터 확인
                // console.log(response.result);
                // console.log(response.data);
                // console.log(subjectsData); // 로그로 데이터 확인
            })
            .catch((error) => {
                console.error("Error fetching subjects:", error);
                setLoading(false);
            });
    };

    // const handlerPull =  () => {
    //     setLoading(true);
    //
    //     // 데이터를 불러오는 비동기 작업을 수행합니다.
    //     const startTime = new Date().getTime();
    //
    //     fetchData()
    //         .then((data) => {
    //             const endTime = new Date().getTime();
    //             const elapsedTime = endTime - startTime;
    //
    //             // 최소 3초간 로딩을 보여줍니다.
    //             const remainingTime = Math.max(0, 3000 - elapsedTime);
    //
    //             setTimeout(() => {
    //                 setSubjectData(data.results.subject);
    //                 setComplete(true);
    //                 setLoading(false);
    //             }, remainingTime);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //             setLoading(false);
    //         });
    // };
    //
    // const fetchData = () => {
    //     // 데이터를 불러오는 비동기 작업을 시뮬레이션합니다.
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(data);
    //         }, 2000);
    //     });
    // };

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
            ) : complete ? (
                <div className="successMessage">
                    <div className="box">
                        <div>
                            {subjectData.map((subject) => (
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
                        <button className="ButtonPull" onClick={() => fetchSubjects(studentId)}> 수강정보 불러오기 </button>
                    </div>
                )
            }
        </div>
    );
};

export default Course;
