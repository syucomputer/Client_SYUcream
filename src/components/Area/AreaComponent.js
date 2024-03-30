import {useEffect, useState} from "react";
import Areas from "./Areas";
import "./AreaComponent.css"
import axios from "axios";

const AreaComponent = ({ onSelectedItemsChange, studentId }) => {
    const [dataJobs, setDataJobs] = useState([]);
    const [dataFields, setDataFields] = useState([]);
    const [dataSkills, setDataSkills] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/member/keyword/all',{
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // 받아온 데이터를 각 항목별로 분류하여 상태에 저장합니다.
                const jobs = response.data.filter(item => item.division === 'job');
                const fields = response.data.filter(item => item.division === 'field');
                const techstacks = response.data.filter(item => item.division === 'techstack');

                setDataJobs(jobs);
                setDataFields(fields);
                setDataSkills(techstacks);
            })
            .catch(error => {
                console.error("API 호출 오류:", error);
            })
    }, []);

    const handleItemClick = (item) => {
        const updatedItems = selectedItems.includes(item)
            ? selectedItems.filter(selectedItem => selectedItem !== item)
            : [...selectedItems, item];
        setSelectedItems(updatedItems);
        onSelectedItemsChange(updatedItems);
    };

    const handleRemoveItem = (item) => {
        setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        onSelectedItemsChange(selectedItems);
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
                        {selectedItem.name}
                        <button className="remove" onClick={() => handleRemoveItem(selectedItem)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AreaComponent