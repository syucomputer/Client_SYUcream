import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Login.css";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = () => {
    // 여기다가 로그인 로직 정의
    login();
    navigate('/')
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
          className="LoginButton"
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
          className="SignButton"
          onClick={handleSign}
        />
      </div>
    </div>
  );
};

export default Login;
