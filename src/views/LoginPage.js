import LoginForm from "../components/login/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // 뷰포트 높이만큼 컨테이너를 늘림
        background: `url(${process.env.PUBLIC_URL}/LoginBackGround.png)`,
        position: "relative",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
