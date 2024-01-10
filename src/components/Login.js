import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 여기다가 로그인 로직 정의
    alert('로그인합니다');
  };

  return (
    <div>
      <h2>테스트 로그인</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin} style={{ width: '500px', 
        height: '50px', borderRadius: '40px', backgroundColor: 'rgb(195, 195, 195)', color: 'White' }}>로그인</button>
    </div>
  );
};

export default Login;