import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subject.css";
import {useAuth} from "../Login/AuthContext";

const SubjectTable = () => {
  const [allSubjects, setAllSubjects] = useState([]); // 모든 과목 데이터를 저장할 상태
  const [subjects, setSubjects] = useState([]); // 필터링된 과목 데이터를 저장할 상태
  const [subjectsInfo, setSubjectsInfo] = useState([]); // subjectGaol이 담긴 데이터를 저장할 상태
  const [search, setSearch] = useState(""); // 검색어 상태
  const [semester, setSemester] = useState(""); // 선택된 학기 상태

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

  const [sortOption, setSortOption] = useState("추천순");
  const { user } = useAuth();

  const getStatusClassName = (status) => {
    switch (status) {
      case "수강 완료":
        return "background-completed";
      case "강력 추천":
        return "background-highly-recommended";
      case "추천":
        return "background-recommended";
      default:
        return "";
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/subject/recommend")
      .then((response) => {
        console.log(response.data.results)
        const subjectsData = response.data.results?.subjects;

        setAllSubjects(subjectsData || []); // API 호출 결과를 allSubjects에 저장
        setSubjects(subjectsData || []); // 초기 subjects 상태도 업데이트

        // console.log(response.result);
        // console.log(response.data);
        // console.log(subjectsData); // 로그로 데이터 확인
      })
      .catch((error) => {
        console.error("데이터를 불러오지 못 했습니다. ", error);
        setAllSubjects([]); // 에러 발생 시 allSubjects를 빈 배열로 초기화
        setSubjects([]);
      });
  }, []);

  useEffect(() => {
    if(user) {
      axios
          .get(`http://localhost:8080/subject/${user.memId}`)
          .then((response) => {
            const subjectsInfoData = response.data.results?.subject;
            setSubjectsInfo(subjectsInfoData || []); //API호출 결과를 setSubjectsInfo에 저장
            // console.log(response.result);
            // console.log(response.data);
            // console.log(subjectsInfoData);
          })
          .catch((error) => {
            console.error("subjectInfo 데이터를 불러오지 못 했습 니다.", error);
            setSubjectsInfo([]); // 에러 발생 시 SubjectsInfo를 빈 배열로 초기화
          });
    }
  }, []);

  useEffect(() => {
    // 검색어와 학기에 따라 과목 데이터 필터링
    const filteredSubjects = allSubjects.filter((subject) => {
      // 강좌명 또는 교수명에 검색어가 포함되어 있는지 확인
      return (
        (subject.subjectName?.toLowerCase().includes(search.toLowerCase()) ||
          subject.subjectProfessor
            ?.toLowerCase()
            .includes(search.toLowerCase())) &&
        (semester ? subject.subjectOpen === semester : true)
      );
    });
    setSubjects(filteredSubjects);
  }, [search, semester, allSubjects]); // 의존성 배열에 search, semester, allSubjects 추가

  const handleSubjectClick = (subjectID) => {
    // console.log(subjectsInfo.subjectGoal);
    setSelectedSubject(
      subjectsInfo ? subjectsInfo.subjectName : "과목 정보 없음",
      subjectsInfo ? subjectsInfo.subjectProfessor : "정보 없음",
      subjectsInfo ? subjectsInfo.subjectGoal : "목표 정보 없음"
    );
    setIsModalOpen(true); // 모달창 열기
  };

  useEffect(() => {
    let sortedSubjects = [...allSubjects];

    if (sortOption === "추천순") {
      sortedSubjects.sort((a, b) => {
        const order = { "강력 추천": 1, 추천: 2 };
        return (order[a.subjectStatus] || 3) - (order[b.subjectStatus] || 3);
      });
    } else if (sortOption === "학년순") {
      sortedSubjects.sort((a, b) =>
        a.subjectGrade.localeCompare(b.subjectGrade)
      );
    }

    setSubjects(sortedSubjects); // 정렬된 데이터로 상태 업데이트
  }, [sortOption, allSubjects]); // sortOption과 allSubjects가 바뀔 때마다 실행

  const pageNumbers = [];

  for (
    let i = startPage;
    i < startPage + 5 && i <= Math.ceil(subjects.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="container-form">
      <div>
        <div>
          <label className="label-title">컴퓨터공학과</label>
          <input
            className="search-form"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="강좌명 또는 교수명 검색"
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
      </div>
      <div className="semester-form">
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">--학기-- 선택</option>
          <option value="2023-1">2023년 1학기</option>
          <option value="2023-2">2023년 2학기</option>
          <option value="2024-1">2024년 1학기</option>
          {allSubjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.completeYear + '년' +  subject.completeTerm}
            </option>
          ))}
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
          {currentItems.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subjectGrade}학년</td>
              <td>{subject.subjectSort}</td>
              <td onClick={() => handleSubjectClick(subject.subjectGoal)}>
                {subject.subjectName}
              </td>
              <td>{subject.subjectOpen}</td>
              <td>{subject.subjectProfessor}</td>
              <td>
                <span className={getStatusClassName(subject.subjectStatus)}>
                  {subject.subjectStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pageNation-container">
        {startPage >= 0 && (
          <button
            onClick={() => setStartPage(startPage - 4 >= 1 ? startPage - 4 : 1)}
            disabled={startPage === 1}
          >
            {"<"}
          </button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        {startPage + 4 < Math.ceil(subjects.length / itemsPerPage) && (
          <button onClick={() => setStartPage(startPage + 4)}>{">"}</button>
        )}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <p className="pstyle">{subjectsInfo.subjectName}</p>
            <p>교수:{subjectsInfo.subjectProfessor}</p>
            <p>학년:{subjectsInfo.subjectGrade}학년</p>
            <p>{subjectsInfo.subjectGoal}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
