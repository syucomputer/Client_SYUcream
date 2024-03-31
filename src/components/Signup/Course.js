import React, {useEffect, useState} from "react";
import Button from "../Button/Button";
import "./Course.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Course = ({ studentId }) => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (studentId) {
            Subjects(studentId);
        }
    }, [studentId]);

    const Subjects = (studentId) => {
        setLoading(true);
        // 수강 과목을 불러오는 요청을 보냅니다.
        axios.get(`http://localhost:8080/subject/user/${studentId}`,{

        })
            .then((response) => {
                // const mySubjectData = response.data.results.subjects;
                // console.log(studentId)
                // setSubjectData(mySubjectData);
                // console.log(mySubjectData);

                // console.log(response.result);
                // console.log(response.data);
                // console.log(subjectsData); // 로그로 데이터 확인
                // console.log(response.result);
                // console.log(response.data);
                // console.log(subjectsData); // 로그로 데이터 확인
                // 응답 데이터의 구조를 확인하여 존재하는지 확인
                if (response.data.results && response.data.results.subjects) {
                    // 수강과목 데이터가 있는 경우
                    const subjectData = response.data.results.subjects;
                    // 상태 업데이트
                    setSubjectData(subjectData);
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
                        <button className="ButtonPull" onClick={() => Subjects(studentId)}> 수강정보 불러오기 </button>
                    </div>
                )
            }
        </div>
    );
};

export default Course;
