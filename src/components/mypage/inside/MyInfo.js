import Button from "../../Button/Button";
import ModalWindow from "../../Modal/ModalWindow";
import AreaComponent from "../../Area/AreaComponent";
import {useState} from "react";
import "./MyInfo.css"

const MyInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const handlerEdit = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectedKeywordsChange = (selectedItem) => {
        // 선택한 키워드 추가 또는 제거
        if (selectedKeywords.includes(selectedItem)) {
            setSelectedKeywords((prevSelected) =>
                prevSelected.filter((item) => item !== selectedItem)
            );
        } else {
            setSelectedKeywords((prevSelected) => [...prevSelected, selectedItem]);
        }
    };

    const handleKeywordSelection = (selectedKeywords) => {
        setSelectedKeywords(selectedKeywords);
    };
    return(
        <div>
            <div>
                <h1>나의 정보 관리</h1>
                <div className="keywordContainer">
                    <div className="keyword">
                        <label>나의 관심 키워드</label>
                        <Button label="수정하기" className="keywordEdit" onClick={handlerEdit}/>
                    </div>
                    <div className="selectKeyword">
                        {selectedKeywords.map((selectedItem, index) => (
                            <div key={index} className="SelectedItem">
                                {selectedItem.jobTitle}
                                <button className="remove" onClick={() => handleSelectedKeywordsChange(selectedItem)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalWindow
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
            >
                <h2>관심있는 키워드를 선택해주세요!</h2>
                <AreaComponent onSelectedItemsChange={handleKeywordSelection} />
                <Button label="선택완료" className="selectButton" onClick={handleCloseModal} />
            </ModalWindow>
        </div>
    )
}
export default MyInfo;