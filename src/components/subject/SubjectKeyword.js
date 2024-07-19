import KeywordButton from "../button/KeywordButton";
import {useState} from "react";

const SubjectKeyword = () => {
    const [select1, setSelect1] = useState(true);
    const [select2, setSelect2] = useState(false);

    // 첫 번째 버튼을 클릭했을 때 select1 상태를 반전시키는 함수
    const handleSelect1 = () => {
        setSelect1(prevSelect => !prevSelect);
        // 첫 번째 버튼을 클릭했을 때 두 번째 버튼의 select 상태를 false로 변경
        setSelect2(false);
    };

    // 두 번째 버튼을 클릭했을 때 select2 상태를 반전시키는 함수
    const handleSelect2 = () => {
        setSelect2(prevSelect => !prevSelect);
        // 두 번째 버튼을 클릭했을 때 첫 번째 버튼의 select 상태를 false로 변경
        setSelect1(false);
    };
    return (
        <div>
            <KeywordButton label="기존 정보 기반 추천받기" onSelect={handleSelect1} selected={select1} id="기본정보" />
            <KeywordButton label="새로운 정보 입력" onSelect={handleSelect2} selected={select2} id="새로운정보" />
        </div>
    )
}

export default SubjectKeyword;