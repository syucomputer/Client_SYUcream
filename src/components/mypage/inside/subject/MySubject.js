import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MySubject.css";
import {useAuth} from "../../../login/AuthContext";

const MySubject = () => {
    const [allSubjects, setAllSubjects] = useState([]); // 모든 과목 데이터를 저장할 상태
    // const [subjects, setSubjects] = useState([]); // 필터링된 과목 데이터를 저장할 상태
    const [search, setSearch] = useState(""); // 검색어 상태
    const [semester, setSemester] = useState([]); // 선택된 년도 학기 상태
    const [selectedSemester, setSelectedSemester] = useState("");

    const [sortOption, setSortOption] = useState("추천순");
    const { user } = useAuth();


    useEffect(() => {
        console.log(user.memId)
        axios
            .get(`/subject/course/${user.memId}`)
            .then((response) => {
                console.log("수강과목", response.data)
                const subjectsData = response.data.results.subjects;

                setAllSubjects(subjectsData || []); // API 호출 결과를 allSubjects에 저장
                // setSubjects(subjectsData || []); // 초기 subjects 상태도 업데이트

                // ..년도 ..학기 select문
                const semesterList = subjectsData.map(semester => `${semester.completeYear}-${semester.completeTerm}`);
                setSemester(semesterList);
            })
            .catch((error) => {
                console.error("데이터를 불러오지 못 했습니다. ", error);
            });
    }, []);

    // useEffect(() => {
    //     // 검색어와 학기에 따라 과목 데이터 필터링
    //     const filteredSubjects = allSubjects.filter((subject) => {
    //         // 강좌명 또는 교수명에 검색어가 포함되어 있는지 확인
    //         return (
    //             (subject.subjectName?.toLowerCase().includes(search.toLowerCase()) ||
    //                 subject.subjectProfessor
    //                     ?.toLowerCase()
    //                     .includes(search.toLowerCase())) &&
    //             (semester ? subject.subjectOpen === semester : true)
    //         );
    //     });
    //     setSubjects(filteredSubjects);
    // }, [search, semester, allSubjects]); // 의존성 배열에 search, semester, allSubjects 추가

    const handleChangeSemester = (e) => {
        const selectedSemester = e.target.value;
        setSelectedSemester(selectedSemester);
    };

    return (
        <div className="my-subject-container">
            <div>
                <label className="label-title">컴퓨터공학과</label>
                <input
                    className="search-form"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search"
                />

                <select
                    className="short-form"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="추천순">추천순</option>
                    <option value="학년순">학년순</option>
                </select>
            </div>
            <div className="semester-form">
                <select value={selectedSemester} onChange={handleChangeSemester}>
                    <option value="">--학기-- 선택</option>
                    {semester.map((semester, index) => (
                        <option key={index} value={semester}>{semester}</option>
                    ))}
                </select>
            </div>
            <table className="SubjectTable">
                <thead>
                <tr>
                    <th>학년</th>
                    <th>구분</th>
                    <th>강좌명</th>
                    <th>학점</th>
                    <th>교수명</th>
                    <th>수강년도-수강학기</th>
                </tr>
                </thead>
                <tbody>
                {allSubjects.map((subject, index) => (
                    <tr key={index}>
                        <td>{subject.subjectGrade}학년</td>
                        <td>{subject.subjectSort}</td>
                        <td>{subject.subjectName}</td>
                        <td>{subject.subjectPoint}</td>
                        <td>{subject.subjectProfessor}</td>
                        <td>{subject.completeYear}-{subject.completeTerm}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySubject;