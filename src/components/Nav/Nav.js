import Button from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../Login/AuthContext";
import {useState} from "react";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // useAuth 훅을 통해 logout 함수를 가져옴
  const [pageTest, setPageTest] = useState(true);
  const handlerLogin = () => {
    navigate("/login");
  };

  const handlerSignup = () => {
    navigate("/signup");
  };

  const handlerMypage = () => {
    navigate("/mypage/info");
    setPageTest(false);
  };

  const handlerLogout = () => {
    // 로그아웃 버튼 클릭 시 logout 함수 호출
    logout();

    // 로그아웃 후 이동할 페이지로 navigate
    navigate("/");
  };

  const active = {
    color: "black",
  };

  const imageUrl = "/profile/alarm.jpg"

  return (
    <nav
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#ffffff",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <NavLink to="/" className="NavLink" style={user ? active : {}}>
        홈
      </NavLink>
      <NavLink to="/trends" className="NavLink" style={user ? active : {}}>
        최신 동향
      </NavLink>
      <NavLink to="/subject" className="NavLink" style={user ? active : {}}>
        과목 추천
      </NavLink>
      <NavLink to="/roadmap" className="NavLink" style={user ? active : {}}>
        로드맵 생성
      </NavLink>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          alignItems: "center",
        }}
      >
        {user ? (
            // 로그인 상태일 때 표시할 내비게이션
            pageTest ? (
                // 마이페이지가 아닐 때
                <>
                    <img className="imageAlarm" src={imageUrl} alt="alarm"/>
                    <Button
                        label="로그아웃"
                        className="loginButton"
                        onClick={handlerLogout}
                    />
                    <Button label="마이페이지" className="signButton" onClick={handlerMypage}/>
                </>
            ) : (
                // 마이페이지 일 때
                <>
                    <img className="imageAlarm" src={imageUrl} alt="alarm"/>
                    <Button
                        label="로그아웃"
                        className="loginButton"
                        onClick={handlerLogout}
                    />
                </>
            )
        ) : (
          // 로그인 상태가 아닐 때 표시할 내비게이션
          <>
            <Button
              label="로그인"
              className="loginButton"
              onClick={handlerLogin}
            />
            <Button
              label="회원가입"
              className="signButton"
              onClick={handlerSignup}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
