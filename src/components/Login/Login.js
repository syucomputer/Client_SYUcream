import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 여기다가 로그인 로직 정의
    alert("로그인합니다");
  };

  const handleSign = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="Login-form">
        <h2 style={{ textAlign: "center" }}>로그인</h2>
        <InputField
          type="text"
          label="학번"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="로그인"
          style={{ width: "100%", height: "40px", marginTop: "20px" }}
          onClick={handleLogin}
        />
        <div
          style={{ textAlign: "center", fontSize: "12px", marginTop: "10px" }}
        >
          계속하려면 사용 및 개인정보 보호 정책에 동의합니다.
        </div>
        <div className="Forgot-password">비밀번호를 잊으셨나요?</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          label="회원가입"
          style={{
            width: "510px",
            height: "40px",
            marginTop: "30px",
            color: "black",
            backgroundColor: "#ffffff",
          }}
          onClick={handleSign}
        />
      </div>
    </div>
  );
};

export default Login;
