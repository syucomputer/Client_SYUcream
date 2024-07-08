import Roadmap from "./Roadmap";
import {useNavigate, useParams} from "react-router-dom";
import ChatRoom from "../chat/ChatRoom";
import BackButton from "../../../Button/BackButton";
import "./Roadmap.css"

const ReviewRoadmap = () => {
    const { roadmapId } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <div className="review-container">
                <div className="flex-1">
                    <div className="title-container">
                        <BackButton onClick={() => navigate(-1)}/>
                        <label>로드맵 관리</label>
                    </div>
                    <Roadmap selectedRoadmapId={roadmapId}/>
                </div>
                <div className="flex-1">
                    <ChatRoom selectedRoadmapId={roadmapId}/>
                </div>
            </div>
        </div>
    );
}

export default ReviewRoadmap;
