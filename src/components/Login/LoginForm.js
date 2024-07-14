import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./Login.css";
import { useAuth } from "./AuthContext";
import axios from "axios";
import useToast from "../Toast/useToast";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post('/member/login', {
        memId: id,
        password: password,
      });

      if (request.status === 200) {
        const { accessToken, refreshToken, ...user } = request.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        login(user);

        showToast('로그인에 성공하셨습니다.', 'success');
        navigate('/mypage/info');
      } else {
        console.error('로그인 실패:', request);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  const handleSign = () => {
    navigate("/signup");
  };

  return (
      <div>
        <div className="LoginForm">
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
              showHideOption={false}
          />
          <Button
            label="로그인"
            className={id && password ? "LoginButton ButtonFill" : "LoginButton"}
            onClick={handleLogin}
          />
          <div className="Center Label">
            계속하려면 사용 및 개인정보 보호 정책에 동의합니다.
          </div>
          <div className="ForgotPassword">비밀번호를 잊으셨나요?</div>
        </div>
        <div className="Center">
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