import React, {useEffect, useState} from "react";
import Areas from "./Areas";
import "./Areas.css"
import axios from "axios";
import {useAuth} from "../login/AuthContext";
import Button from "../button/Button";

const AreaComponent = ({ onSelectedItemsChange }) => {
  const [dataJobs, setDataJobs] = useState([]);
  const [dataFields, setDataFields] = useState([]);
  const [dataSkills, setDataSkills] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/member/keyword/all',{
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

  useEffect(() => {
    if (user) {
      axios.get(`/member/${user.memId}/keyword`, {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          const { job, field, techStack } = response.data;
          const formattedItems = [
            ...job.map(name => ({ name, division: 'job' })),
            ...field.map(name => ({ name, division: 'field' })),
            ...techStack.map(name => ({ name, division: 'techstack' }))
          ];
          setSelectedItems(formattedItems);
        })
        .catch(error => {
          console.error('키워드 불러오기 실패 : ', error);
        });
    }
  }, [user])

  const handleItemClick = (item) => {
    const isItemAlreadySelected = selectedItems.some(selectedItem => selectedItem.name === item.name && selectedItem.division === item.division);

    const updatedItems = isItemAlreadySelected
      ? selectedItems.filter(selectedItem => !(selectedItem.name === item.name && selectedItem.division === item.division))
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
    onSelectedItemsChange(updatedItems);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(selectedItem => !(selectedItem.name === item.name && selectedItem.division === item.division));
    setSelectedItems(updatedItems);
    onSelectedItemsChange(updatedItems);
  };

  return (
    <div className="AreaBoxContainer">
      <div className="Areas">
        <Areas VisibleItemCount="8" label="직무/직업" list={dataJobs} onItemClick={handleItemClick} />
        <Areas VisibleItemCount="8" label="전문분야" list={dataFields} onItemClick={handleItemClick} />
        <Areas VisibleItemCount="8" label="기술스택" list={dataSkills} onItemClick={handleItemClick} />
      </div>
      <div className="AllItems">
        {selectedItems.map((selectedItem, index) => (
          <div key={index} className="SelectedItem">
            {selectedItem.name}
            <Button className="Remove" onClick={() => handleRemoveItem(selectedItem)} label="x" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AreaComponent