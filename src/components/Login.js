import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 여기다가 로그인 로직 정의
    alert('로그인합니다');
  };

  const handleSign = () => {
      navigate("/signup")
  }

  return (
      <div>
        <div style={{
            width: '450px',
            height: '400px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            position: 'relative'
        }}>
          <h2 style={{ textAlign: "center" }}>로그인</h2>
          <InputField type="text" label="학번" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <InputField type="password" label="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button label="로그인" style={{ width: '100%', height: '40px', marginTop: '20px'}} onClick={handleLogin} />
            <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '10px'}}>계속하려면 사용 및 개인정보 보호 정책에 동의합니다.</div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', margin: '20px', fontSize: '12px', textDecoration: 'underline'}}>비밀번호를 잊으셨나요?</div>
        </div>
          <div style={{ textAlign: 'center'}}>
              <Button label="회원가입" style={{ width: '510px',  height: '40px', marginTop: '30px', color: 'black',backgroundColor: '#ffffff'}} onClick={handleSign}/>
          </div>
      </div>
  );
};

export default Login;