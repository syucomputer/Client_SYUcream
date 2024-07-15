import React, {useContext, useState} from "react";
import Signup from "./Signup";
import Course from "./Course";
import AreaOfInterest from "./AreaOfInterest";
import "./Signup.css";
import {Outlet, useNavigate} from "react-router-dom";
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