import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  const navigate = useNavigate();

  const handlerLogin = () => {
    navigate("/login");
  };
  const handlerSignup = () => {
    navigate("/signup");
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#ffffff",
        position: "relative",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          alignItems: "center",
        }}
      >
        <Button label="로그인" className="loginButton" onClick={handlerLogin} />
        <Button label="회원가입" className="signButton" onClick={handlerSignup} />
      </div>
    </nav>
  );
};

export default Nav;
