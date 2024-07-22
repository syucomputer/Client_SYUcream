import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../login/AuthContext";
import {useState} from "react";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // useAuth 훅을 통해 logout 함수를 가져옴
  const [login, setLogin] = useState(true);

  const active = {
    color: "black",
  };

  return (
    <nav className="nav-container">
      <NavLink to="/" className="nav-link" style={user ? active : {}}>
        홈
      </NavLink>
      <NavLink to="/trend" className="nav-link" style={user ? active : {}}>
        최신 동향
      </NavLink>
      {user && user.division === '학생'? (
        <>
          <NavLink to="/subject" className="nav-link" style={user ? active : {}}>
            과목 추천
          </NavLink>
          <NavLink to="/roadmap" className="nav-link" style={user ? active : {}}>
            로드맵 생성
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/roadmap" className="nav-link" style={user ? active : {}}>
            로드맵 생성
          </NavLink>
          <NavLink to="/roadmap/pro-manage" className="nav-link" style={user ? active : {}}>
            로드맵 관리
          </NavLink>
        </>
      )}
      <div className="nav-button">
        {user ? (
          // 로그인 상태일 때 표시할 내비게이션
          login ? (
            // 마이페이지가 아닐 때
            <>
              <img className="image-alarm" src="/profile/alarm.jpg" alt="alarm"/>
              <Button label="로그아웃" className="login-button" onClick={() => {
                logout()
                navigate("/")
              }}/>
              <Button label="마이페이지" className="sign-button" onClick={() => {
                navigate("/mypage/info")
                setLogin(false)
              }}/>
            </>
          ) : (
            // 마이페이지 일 때
            <>
              <img className="image-alarm" src="/profile/alarm.jpg" alt="alarm"/>
              <Button label="로그아웃" className="login-button" onClick={() => {
                logout()
                navigate("/")
              }}/>
            </>
          )
        ) : (
          // 로그인 상태가 아닐 때 표시할 내비게이션
          <>
            <Button label="로그인" className="login-button" onClick={() => navigate("/login")}/>
            <Button label="회원가입" className="sign-button" onClick={() => navigate("/signup")}/>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
