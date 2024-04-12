import Button from "../Button/Button";
import "./AreaOfInterest.css"
import AreaComponent from "../Area/AreaComponent";
import {useState} from "react";
import axios from "axios";

const AreaOfInterest = ({ studentId, onStepChange }) => {
    const [selectedItems, setSelectedItems] = useState({});

    const handleComplete = () => {
        const postData = {
            job: selectedItems.filter(item => item.division === 'job').map(item => item.name),
            field: selectedItems.filter(item => item.division === 'field').map(item => item.name),
            techStack: selectedItems.filter(item => item.division === 'techstack').map(item => item.name)
        };

        axios.post(`http://localhost:8080/member/${studentId}/keyword`, postData)
            .then(response => {
                console.log('POST 요청 성공:', postData);
                // 여기서 필요한 처리를 수행합니다. 예를 들어, 페이지 이동 등.
                onStepChange(3);
            })
            .catch(error => {
                console.error('POST 요청 실패:', error);
            });
    };

    return (
        <div style={{ textAlign: 'center'}}>
            <h2>관심 분야 입력하기</h2>
            <div>
                사이트 이용을 위한 기본정보를 입력해주세요! <br/>
                해당 정보는 직무추천, 로드맵 추천 등 사이트 이용에 사용됩니다.
            </div>
            <AreaComponent onSelectedItemsChange={setSelectedItems} />
            <Button label="확인" className="AreaButton" onClick={handleComplete} />
        </div>
    );
};

export default AreaOfInterest;
