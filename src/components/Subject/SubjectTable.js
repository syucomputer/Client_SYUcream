import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subject.css";

const SubjectTable = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [semester, setSemester] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalData] = useState(null);

  const [subjectDetailData, setSubjectDetailData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/1`)
      .then((response) => {
        setSubjects(response.data.results.subject);
        setAllSubjects(response.data.results.subject);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setSubjects([]);
      });
  }, []);

  const pageNumbers = [];
  for (
    let i = startPage;
    i < startPage + 5 && i <= Math.ceil(subjects.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    let filteredSubjects = allSubjects;
    if (semester !== "") {
      filteredSubjects = filteredSubjects.filter(
        (subject) => subject.subjectopen === semester
      );
    }
    if (search !== "") {
      filteredSubjects = filteredSubjects.filter(
        (subject) =>
          subject.subjectName.includes(search) ||
          subject.subjectProfessor.includes(search)
      );
    }
    setSubjects(filteredSubjects);
  }, [semester, search, allSubjects]);

  const setModalContent = (subjectId) => {
    if (!subjectDetailData) {
      setModalData("상세 정보를 불러오는 중입니다.");
    } else {
      const subjectDetail = subjectDetailData.find(
        (subject) => subject.subjectId === subjectId
      );
      if (subjectDetail) {
        setModalData(subjectDetail.subjectGoal);
      } else {
        setModalData("상세 정보를 불러오는 데 실패했습니다.");
      }
    }
  };

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
          {currentItems.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subjectGrade}학년</td>
              <td>{subject.subjectClassification}</td>
              <td
                onClick={() => {
                  setModalContent(subject.subjectId);
                  setIsModalOpen(true);
                }}
              >
                {subject.subjectName}
              </td>
              <td>{subject.subjectopen}</td>
              <td>{subject.subjectProfessor}</td>
              <td>{subject.subjectStatus}</td>
            </tr>
          ))}
        </tbody>
        <div className="pageNation-container">
          {startPage >= 0 && (
            <button
              onClick={() =>
                setStartPage(startPage - 4 >= 1 ? startPage - 4 : 1)
              }
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
      </table>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span onClick={() => setIsModalOpen(false)}>Close</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
