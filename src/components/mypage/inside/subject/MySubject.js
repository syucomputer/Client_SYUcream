import {useEffect, useState} from "react";
import "./MySubject.css"
import axios from "axios";

const MySubject = () => {
    const [allSubjects, setAllSubjects] = useState([]); // 모든 과목 데이터를 저장할 상태
    const [subjects, setSubjects] = useState([]); // 필터링된 과목 데이터를 저장할 상태
    const [subjectsInfo, setSubjectsInfo] = useState([]); // subjectGaol이 담긴 데이터를 저장할 상태
    const [search, setSearch] = useState(""); // 검색어 상태
    const [semester, setSemester] = useState(""); // 선택된 학기 상태
    const [grade, setGrade] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

    const [sortOption, setSortOption] = useState("추천순");
    const pageNumbers = [];

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/subject/recommend`)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }, []);

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

    const handleSubjectClick = (subjectID) => {
        // console.log(subjectsInfo.subjectGoal);
        setSelectedSubject(
            subjectsInfo ? subjectsInfo.subjectName : "과목 정보 없음",
            subjectsInfo ? subjectsInfo.subjectProfessor : "정보 없음",
            subjectsInfo ? subjectsInfo.subjectGoal : "목표 정보 없음"
        );
        setIsModalOpen(true); // 모달창 열기
    };
    return (
        <div className="container">
            <label>강좌명을 클릭하면 강의계획서를 확인 가능합니다.</label>
            <div className="container-form">
                <div>
                    <div>
                        <label className="label-title">수강내역</label>
                        <input
                            className="search-form"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                        />
                        <select
                            className="short-form"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        >
                            <option value="학년순">학년순</option>
                            <option value="추천순">추천순</option>
                        </select>
                        <select
                            className="short-form"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="">전체 학년</option>
                            <option value="1학년">1학년</option>
                            <option value="2학년">2학년</option>
                            <option value="3학년">3학년</option>
                            <option value="4학년">4학년</option>
                        </select>
                    </div>
                </div>
                <div className="semester-form">
                    <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                        <option value="">전체학년</option>
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
                        <th>학점</th>
                        <th>교수명</th>
                        <th>수강년도-수강학기</th>
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
        </div>
    );
};


export default MySubject;