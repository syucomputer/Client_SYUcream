import Nav from "../components/Nav/Nav";
import MyPageComponent from "../components/mypage/MyPageComponent";

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
            <Nav />
            <MyPageComponent />
        </div>
    )
}

export default MyPage;