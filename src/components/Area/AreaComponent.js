import {useEffect, useState} from "react";
import testListData from "./testListData.json";
import Areas from "./Areas";
import "./AreaComponent.css"

const AreaComponent = ({ onSelectedItemsChange }) => {
    const [dataJobs, setDataJobs] = useState([]);
    const [dataFields, setDataFields] = useState([]);
    const [dataSkills, setDataSkills] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // 비동기 작업을 수행한다고 가정
        // 예를 들어, API 호출 등...

        setDataJobs(testListData.results.jobs);
        setDataFields(testListData.results.fields);
        setDataSkills(testListData.results.skills);
    }, []);

    const handleItemClick = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }

        onSelectedItemsChange(selectedItems); // 선택된 아이템들을 부모 컴포넌트로 전달
    };

    const handleRemoveItem = (item) => {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        onSelectedItemsChange(selectedItems); // 선택된 아이템들을 부모 컴포넌트로 전달
    };

    return (
        <div className="AreaBoxContainer">
            <div className="Areas">
                <Areas label="직무/직업" list={dataJobs} onItemClick={handleItemClick} />
                <Areas label="전문분야" list={dataFields} onItemClick={handleItemClick} />
                <Areas label="기술스택" list={dataSkills} onItemClick={handleItemClick} />
            </div>
            <div className="AllItems">
                {selectedItems.map((selectedItem, index) => (
                    <div key={index} className="SelectedItem">
                        {selectedItem.jobTitle}
                        <button className="remove" onClick={() => handleRemoveItem(selectedItem)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AreaComponent