import React, {useContext} from "react";
import "./Signup.css";
import {Outlet} from "react-router-dom";
import {StudentIdContext} from "./StudentIdContext";

const SignupForm = () => {
  const { setStudentId } = useContext(StudentIdContext);

  const handleStudentIdChange = (id) => {
    setStudentId(id); // 학번 상태 업데이트
  };

  return (
    <div className="Signup-container">
      <Outlet context={{ handleStudentIdChange }} />
    </div>
  );
};

export default SignupForm;