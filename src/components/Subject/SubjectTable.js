import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subject.css";

const SubjectTable = () => {
  const [allSubjects, setAllSubjects] = useState([]); // 모든 과목 데이터를 저장할 상태
  const [subjects, setSubjects] = useState([]); // 필터링된 과목 데이터를 저장할 상태
  const [search, setSearch] = useState(""); // 검색어 상태
  const [semester, setSemester] = useState(""); // 선택된 학기 상태

  useEffect(() => {
    axios
      .get("http://localhost:8080/subject/recommend")
      .then((response) => {
        const subjectsData = response.data.results?.subject;

        setAllSubjects(subjectsData || []); // API 호출 결과를 allSubjects에 저장
        setSubjects(subjectsData || []); // 초기 subjects 상태도 업데이트

        console.log(response.result);
        console.log(response.data);
        console.log(subjectsData); // 로그로 데이터 확인
      })
      .catch((error) => {
        console.error("데이터를 불러오지 못 했습니다. ", error);
        setAllSubjects([]); // 에러 발생 시 allSubjects를 빈 배열로 초기화
      });
  }, []);

  useEffect(() => {
    // 검색어와 학기에 따라 과목 데이터 필터링
    const filteredSubjects = allSubjects.filter((subject) => {
      return (
        subject.subjectName.toLowerCase().includes(search.toLowerCase()) &&
        (semester ? subject.subjectOpen === semester : true)
      );
    });

    setSubjects(filteredSubjects);
  }, [search, semester, allSubjects]); // 의존성 배열에 search, semester, allSubjects 추가

  return (
    <div className="container-form">
      <div>
        <label className="label-title">컴퓨터공학과</label>
        <input
          className="search-form"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="강좌명 또는 교수명 검색"
        />
      </div>
      <div className="semester-form">
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">--학기-- 선택</option>
          <option value="2023-1">2023년 1학기</option>
          <option value="2023-2">2023년 2학기</option>
          <option value="2024-1">2024년 1학기</option>
        </select>
      </div>

      <table className="SubjectTable">
        <thead>
          <tr>
            <th>학년</th>
            <th>구분</th>
            <th>강좌명</th>
            <th>개설학기</th>
            <th>교수명</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects &&
            subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectGrade}학년</td>
                <td>{subject.subjectClassification}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.subjectOpen}</td>
                <td>{subject.subjectProfessor}</td>
                <td>{subject.subjectStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectTable;
