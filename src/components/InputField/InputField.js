import React, { useState, forwardRef } from "react";
import Button from "../Button/Button";
import "./InputField.css";
import axios from "axios";
import useToast from "../Toast/useToast";

const InputField = forwardRef(({ type, label, value, onChange, onVerificationSuccess, showHideOption = true}, ref ) => {
  const isEmailField = label === "이메일"; // 이메일 필드 여부를 판별

  const [inputType, setInputType] = useState(type);
  const [isEmail, setIsEmail] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("인증하기");
  const [verificationCode, setVerificationCode] = useState("");

  const [inputValue, setInputValue] = useState(value); // value prop을 로컬 상태로 관리
  const showToast = useToast();

  // 입력 값이 변경될 때마다 상태를 업데이트하고, 부모 컴포넌트에서 전달된 onChange 핸들러 호출
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  // email 보내는 로직
  const postEmail = async () => {
    setIsEmail(true);
    setButtonLabel("재전송하기");

    try {
      const response = await axios.post(`/auth/${inputValue}`, {
          userEmail: inputValue
      });
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error("이메일 전송 실패:", error);
    }
  };

  // email 인증 코드 정규표현식
  const handleCodeChange = (e) => {
    const code = e.target.value;
    const filteredValue = code.replace(/[^A-Za-z0-9]/g, ""); // 정규 표현식(영문, 숫자)
    setVerificationCode(filteredValue);

    if (code.length === 8) setIsRight(true);
    else setIsRight(false);
  };

  // 인증 코드 확인 함수
  const checkVerificationCode = async () => {
    try {
      const response = await axios.get(`/auth/${inputValue}/${verificationCode}`);

      if (response.status === 200) {
        setIsEmail(false);
        setIsSuccess(true);
        if (onVerificationSuccess) {
          onVerificationSuccess(); // 인증 성공 시 콜백 함수 호출
        }
      } else {
        setVerificationCode("");
        setIsRight(false);
      }
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
      showToast('인증 코드가 올바르지 않습니다.', 'error');
    }
  };

  // 패스워드 보이게 하는 함수
  const handlePasswordHide = () => {
    setInputType(prevType => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="InputField">
      <div>
        <div className="InputContainer">
          <label className="InputFieldLabel">{label}</label>
          {type === "password" && showHideOption &&
            <label onClick={handlePasswordHide} className="PasswordHide">
              <img
                className="IconHide"
                src={inputType === 'text'
                  ? "profile/icon/Hide_On.jpg"
                  : "profile/icon/Hide_Off.jpg"}
              />
              Hide
            </label>
          }
        </div>
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          className={isEmailField ? "Input EmailField" : "Input"}
          ref={ref}
        />
        {isEmailField && (
          <>
            <label>@syuin.ac.kr</label>
            {isSuccess ? (
              <input
                type="checkbox"
                checked
                readOnly
                className="CheckBoxStyle"
              />
            ) : (
              <Button
                label={buttonLabel}
                className='ButtonStyle'
                onClick={postEmail}
              />
            )}
          </>
        )}
      </div>
      {isEmailField && isEmail && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <label>인증코드</label>
          <input
            type="text"
            value={verificationCode}
            onChange={handleCodeChange}
            className="EmailCode"
            maxLength="8"
          />
          <Button
            label="인증하기"
            className={isRight ? "CodeButtonStyleRight" : "CodeButtonStyle"}
            onClick={checkVerificationCode}
          />
        </div>
      )}
    </div>
  );
});

export default InputField;