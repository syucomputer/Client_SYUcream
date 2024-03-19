import React, { useState } from "react";
import SignupForm from "./SignupForm";
import Course from "./Course";
import "./Signup.css";
import AreaOfInterest from "./AreaOfInterest";

const Signup = () => {
  const [step, setStep] = useState(1);

  const handleStepChange = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <div className="Signup-container">
      {step === 1 && <SignupForm onStepChange={handleStepChange} />}
      {step === 2 && <AreaOfInterest onStepChange={handleStepChange} />}
      {step === 3 && <Course onStepChange={handleStepChange} />}
    </div>
  );
};

export default Signup;
