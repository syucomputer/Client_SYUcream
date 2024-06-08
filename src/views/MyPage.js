import Nav from "../components/Nav/Nav";
import MyProfile from "../components/mypage/MyProfile";
import {Outlet} from "react-router-dom";

const MyPage = () => {
    return(
        <div
            style={{
                margin: 0,
                padding: 0,
                height: "100vh",
                position: "relative",
                backgroundColor: "#DDDEEA",
            }}
        >
            <Nav/>
            <div
                style={{
                    height: 'calc(100% - 120px)',
                    margin: '30px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    display: 'flex',
                    overflow: 'hidden'
                }}
            >
                <div style={{flex: 1}}>
                    <MyProfile/>
                </div>
                <div style={{flex: 3}}>
                    <Outlet/>
                </div>
            </div>
        </div>

    )
}

export default MyPage;