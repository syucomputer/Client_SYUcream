import React, { useState } from "react";
import SignupForm from "./SignupForm";
import Course from "./Course";
import "./Signup.css";

const Signup = () => {
    const [step, setStep] = useState(1);

    const handleStepChange = (nextStep) => {
        setStep(nextStep);
    };

    return (
        <div className="Signup-container">
            {step === 1 && <SignupForm onStepChange={handleStepChange} />}
            {step === 2 && <Course userId={2020100000} />}
        </div>
    );
};

export default Signup;
