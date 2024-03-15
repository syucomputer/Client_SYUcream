import React, { useState } from "react";
import Button from "../Button/Button";
import "./InputField.css";

const InputField = ({ type, label, value, onChange }) => {
  const isEmailField = label === "이메일"; // 이메일 필드 여부를 판별

  const [isEmail, setIsEmail] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isFailCode, setIsFailCode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("인증하기");
  const [verificationCode, setVerificationCode] = useState("");

const [inputValue, setInputValue] = useState(value); // value prop을 로컬 상태로 관리

// 입력 값이 변경될 때마다 상태를 업데이트하고, 부모 컴포넌트에서 전달된 onChange 핸들러 호출
const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
};

  // email 보내는 로직
  const postEmail = () => {
    setIsEmail(true);
    setButtonLabel("재전송하기");
  };

  // email 인증 코드 정규표현식
  const handleCodeChange = (e) => {
    const code = e.target.value;
    const filteredValue = code.replace(/[^A-Za-z0-9]/g, ""); // 정규 표현식(영문, 숫자)
    setVerificationCode(filteredValue);

    if (code.length === 6) setIsRight(true);
    else setIsRight(false);
  };

  // 이메일 인증 확인
  const rightEmailCode = () => {
    if (verificationCode === "hello1") {
      setIsEmail(false);
      setIsFailCode(false);
      setIsSuccess(true);
    } else {
      setIsFailCode(true);
      setVerificationCode("");
      setIsRight(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      <label style={{ color: "666666" }}>{label}</label>
      <br />
      <div style={{ marginTop: "5px" }}>
        <input
          type={type}
          value={inputValue}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            ...(isEmailField && {
              width: "35%",
            }),
          }}
        />
        {isEmailField && (
          <>
            <label>@syuin.ac.kr</label>
            {!isSuccess && (
              <Button
                label={buttonLabel}
                className='buttonStyle'
                onClick={postEmail}
              />
            )}
            {isSuccess && (
              <input
                type="checkbox"
                checked
                readOnly
                className="checkBoxStyle"
              />
            )}
          </>
        )}
      </div>
      {isEmailField && isEmail && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <label>인증코드 </label>
          <input
            type="text"
            value={verificationCode}
            onChange={handleCodeChange}
            style={{
              width: "80px",
              borderRadius: "0",
              border: "none",
              borderBottom: "1px solid black",
              textAlign: "center",
            }}
            maxLength="6"
          />
          {isFailCode && (
            <label style={{ marginLeft: "8px", color: "red" }}>
              인증 실패!
            </label>
          )}
          <Button
            label="인증하기"
            className={isRight ? "codeButtonStyleRight" : "codeButtonStyle"}
            onClick={rightEmailCode}
          />
        </div>
      )}
    </div>
  );
};

export default InputField;
