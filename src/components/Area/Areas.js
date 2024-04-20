import "./Areas.css"
import Button from "../Button/Button";
import { useState } from "react";
const Areas = ({ label, list, onItemClick }) => {
    const VisibleItemCount = 10;
    const [showAllItems, setShowAllItems] = useState(false);

    const handlerToggle = () => {
        setShowAllItems(prevState => !prevState);
    }

    return (
        <div className="AreaBox">
            <div style={{ fontSize: '14px', fontWeight: 'bold' ,textAlign: 'left' }}>{label}</div>
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