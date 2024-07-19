import Nav from "../components/nav/Nav";
import MyProfile from "../components/mypage/MyProfile";
import {Outlet} from "react-router-dom";

const MyPage = () => {
  return(
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
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
          flexGrow: 1
        }}
      >
        <div style={{
          flex: 1,
          overflow: "auto",
        }}>
          <MyProfile/>
        </div>
        <div style={{
          flex: 2.5,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default MyPage;