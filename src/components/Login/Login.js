import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Login.css";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async () => {
    try {
      // 사용자가 입력한 정보를 가지고 로그인을 시도합니다.
      await login(id, password);

      // 로그인 성공 시 원하는 동작 수행 (예: 페이지 이동)
      navigate('/mypage');
    } catch (error) {
      console.error('로그인 실패 또는 오류', error);
      // 로그인 실패 시 사용자에게 알림 또는 다른 처리를 수행할 수 있습니다.
    }
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
          value={id}
          onChange={(e) => setId(e.target.value)}
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
