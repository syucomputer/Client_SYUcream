import "./Areas.css"
import Button from "../button/Button";
import { useState } from "react";
const Areas = ({ label, list, onItemClick, VisibleItemCount, labelStyle }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const handlerToggle = () => {
    setShowAllItems(prevState => !prevState);
  }

  return (
    <div className="AreaContainer">
      <div className={`AreaLabel ${labelStyle}`}>
        {label}
      </div>
      <div className="AreaBox">
        {list.slice(0, showAllItems ? list.length : VisibleItemCount).map((item) => (
          <button
            className="ClickButton"
            key={item.id}
            onClick={() => onItemClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {(list.length > VisibleItemCount) && (
        <div className="Line">
          <div className="AddBox">
            <Button label={showAllItems ? "닫기" : "▼ 더보기"} className="AddButton" onClick={handlerToggle}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Areas;