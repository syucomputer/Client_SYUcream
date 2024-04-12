import MyProfile from "./MyProfile";
import {useState} from "react";
import MyInfo from "./inside/MyInfo";
import MyRoadmap from "./inside/MyRoadmap";

const MyPageComponent = () => {
    const [content, setContent] = useState(true);

    return(
        <div
            style={{
                height: 'calc(100% - 120px)',
                margin: '30px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex'
            }}
        >
            <div style={{flex: 1}}>
                <MyProfile onChange={setContent} />
            </div>
            <div style={{flex: 4}}>
                {content ? <MyInfo /> : <MyRoadmap />}
            </div>
        </div>
    )
}

export default MyPageComponent