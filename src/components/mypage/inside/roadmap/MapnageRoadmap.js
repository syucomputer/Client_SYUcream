import {useState} from "react";

const ManageRoadmap = ({ setManage }) => {
    const [option, setOption] = useState('')
    return (
        <div>
            <div>
                <button onClick={setManage}>x</button>
                로드맵 관리
            </div>
            <div>
                <select
                    className="short-form"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value="날짜순">날짜순</option>
                    <option value="학년순">학년순</option>
                </select>
            </div>
            <table className="SubjectTable">
                <thead>
                <tr>
                    <th>로드맵 명</th>
                    <th>태그 교수님</th>
                    <th>검토 상태</th>
                    <th>생성 날짜</th>
                    <th>업데이트 날짜</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default ManageRoadmap;