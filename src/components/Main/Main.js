import MenuButton from "../Button/MenuButton";
import {useState} from "react";
import Home from "../Menu/Home";
import LatestTrend from "../Menu/LatestTrend";
import SubjectRecommendation from "../Menu/SubjectRecommendation";
import RoadMap from "../Menu/RoadMap";

const Main = () => {
    const [selectedMenu, setSelectedMenu] = useState('');

    const handleMenu = (title) => {
        setSelectedMenu(title);
    }
    const renderSelectedMenu = () => {
        switch (selectedMenu) {
            case 'home':
                return <Home />;
            case 'trend':
                return <LatestTrend />;
            case 'subject':
                return <SubjectRecommendation />;
            case 'roadmap':
                return <RoadMap />;
            default:
                return <Home />;
        }
    };


    return (
        <div style={{ height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <div style={{ flex: 4 }}>
                {renderSelectedMenu()}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <MenuButton label='홈' title='home' onClick={handleMenu} />
                <MenuButton label='최신 동향' title='trend' onClick={handleMenu} />
                <MenuButton label='과목 추천' title='subject' onClick={handleMenu} />
                <MenuButton label='로드맵 추천' title='roadmap' onClick={handleMenu} />
            </div>
        </div>
    )
}

export default Main;