import LoginForm from "../components/login/LoginForm";
import React from "react";
import FindPassword from "../components/login/FindPassword";

const LoginPage = () => {
  const handleLogin = () => {
    if (window.location.pathname.startsWith('/login')) {
      return <LoginForm />
    } else {
      return <FindPassword />
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${process.env.PUBLIC_URL}/LoginBackGround.png)`,
        position: "relative",
      }}
    >
      {handleLogin()}
    </div>
  );
};

export default LoginPage;
