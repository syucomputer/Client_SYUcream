import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Login.css";
import { useAuth } from "./AuthContext";
import axios from "axios";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 로그인 요청 보내기
      const request = await axios.post('http://localhost:8080/member/login', {
        memId: id,
        password: password,
      });

      // 백엔드에서 로그인 처리 후 클라이언트에서 응답 처리
      if (request.status === 200) {
        // 로그인 성공 시 MyPage로 이동
        login();
        navigate('/mypage');
      } else {
        console.error('로그인 실패:', request);
        // 로그인 실패 시 사용자에게 알림 또는 다른 처리 수행
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      // 오류 발생 시 사용자에게 알림 또는 다른 처리 수행
    }
  };

  const handleSign = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form className="Login-form" onSubmit={handleLogin}>
        <h2 style={{ textAlign: "center" }}>로그인</h2>
        <InputField
          type="text"
          label="학번"
          value={id}
          onChange={(value) => setId(value)}
        />
        <InputField
          type="password"
          label="비밀번호"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <button type="submit"> 로그인 </button>
        <div
          style={{ textAlign: "center", fontSize: "12px", marginTop: "10px" }}
        >
          계속하려면 사용 및 개인정보 보호 정책에 동의합니다.
        </div>
        <div className="Forgot-password">비밀번호를 잊으셨나요?</div>
      </form>
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

export default LoginForm;
