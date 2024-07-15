import "./Areas.css"
import Button from "../Button/Button";
import { useState } from "react";
const Areas = ({ label, list, onItemClick, VisibleItemCount }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const handlerToggle = () => {
    setShowAllItems(prevState => !prevState);
  }

  return (
    <div className="AreaBox">
      <div className="AreaLabel">
        {label}
      </div>
      {list.slice(0, showAllItems ? list.length : VisibleItemCount).map((item) => (
        <button
          className="clickButton"
          key={item.id}
          onClick={() => onItemClick(item)}
        >
          {item.name}
        </button>
      ))}
      {(list.length > VisibleItemCount) && (
        <div className="Line">
          <div className="addContainer">
            <Button label={showAllItems ? "닫기" : "더보기"} className="addButton" onClick={handlerToggle}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Areas;