import Roadmap from "./Roadmap";
import { useParams } from "react-router-dom";
import ChatRoom from "../chat/ChatRoom";

const ReviewRoadmap = () => {
    const { roadmapId } = useParams();

    return (
        <div>
            <h1 style={{ margin: '30px' }}>로드맵 관리</h1>
            <div
                style={{
                    height: 'calc(100% - 120px)',
                    margin: '30px',
                    backgroundColor: 'white',
                    display: 'flex',
                    overflow: 'hidden'
                }}
            >
                <div style={{flex: 1}}>
                    <Roadmap selectedRoadmapId={roadmapId}/>
                </div>
                <div style={{flex: 1}}>
                    <ChatRoom selectedRoadmapId={roadmapId}/>
                </div>
            </div>
        </div>
    );
}

export default ReviewRoadmap;
