import React, { useState } from "react";
import SignupForm from "./SignupForm";
import Course from "./Course";
import AreaOfInterest from "./AreaOfInterest";
import "./Signup.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(""); // 학번 상태 추가

  const handleStepChange = (nextStep) => {
    setStep(nextStep);
  };

  const handleStudentIdChange = (id) => {
    setStudentId(id); // 학번 상태 업데이트
  };

  return (
    <div className="Signup-container">
      {step === 1 && <SignupForm onStepChange={handleStepChange} onStudentIdChange={handleStudentIdChange} />}
      {step === 2 && <AreaOfInterest studentId={studentId} onStepChange={handleStepChange}/>}
      {step === 3 && <Course studentId={studentId} />}
    </div>
  );
};

export default Signup;