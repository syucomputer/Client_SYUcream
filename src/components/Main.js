import MenuButton from "./MenuButton";
import {useState} from "react";
import Home from "./Menu/Home";
import LatestTrend from "./Menu/LatestTrend";
import SubjectRecommendation from "./Menu/SubjectRecommendation";
import RoadMap from "./Menu/RoadMap";

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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 4}}>
                {renderSelectedMenu()}
            </div>
            <div style={{ flex: 1}}>
                <MenuButton label='최신 동향' title='trend' onClick={handleMenu} />
                <MenuButton label='과목 추천' title='subject' onClick={handleMenu} />
                <MenuButton label='로드맵 추천' title='roadmap' onClick={handleMenu} />
            </div>
        </div>
    )
}

export default Main;