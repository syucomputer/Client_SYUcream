import Button from "../Button/Button";
import "./AreaOfInterest.css"
import AreaComponent from "../Area/AreaComponent";

const AreaOfInterest = ({ onStepChange }) => {
    const handleComplete = () => {
        onStepChange(3);
    };

    return (
        <div style={{ textAlign: 'center'}}>
            <h2>관심 분야 입력하기</h2>
            <div>
                사이트 이용을 위한 기본정보를 입력해주세요! <br/>
                해당 정보는 직무추천, 로드맵 추천 등 사이트 이용에 사용됩니다.
            </div>
            <AreaComponent />
            <Button label="확인" className="AreaButton" onClick={handleComplete} />
        </div>
    );
};

export default AreaOfInterest;
