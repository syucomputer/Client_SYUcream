import React, { useState } from "react";
import Button from "../Button/Button";
import "./InputField.css";
import axios from "axios";

const InputField = ({ type, label, value, onChange, onVerificationSuccess }) => {
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
    const postEmail = async () => {
        setIsEmail(true);
        setButtonLabel("재전송하기");

        try {
            const response = await axios.post(`http://localhost:8080/auth/${inputValue}`, {
                userEmail: inputValue
            });
            console.log(response.data); // 응답 확인
            // 응답에 따른 처리 (예: 성공 시 화면에 메시지 표시)
        } catch (error) {
            console.error("이메일 전송 실패:", error);
            // 실패 시 처리 로직 추가
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
            const response = await axios.get(`http://localhost:8080/auth/${inputValue}/${verificationCode}`);

            if (response.status === 200) {
                setIsEmail(false);
                setIsFailCode(false);
                setIsSuccess(true);
                if (onVerificationSuccess) {
                    onVerificationSuccess(); // 인증 성공 시 콜백 함수 호출
                }
            } else {
                setIsFailCode(true);
                setVerificationCode("");
                setIsRight(false);
            }
        } catch (error) {
            console.error("인증 코드 확인 실패:", error);
            // 실패 시 처리 로직 추가
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
                        maxLength="8"
                    />
                    {isFailCode && (
                        <label style={{ marginLeft: "8px", color: "red" }}>
                            인증 실패!
                        </label>
                    )}
                    <Button
                        label="인증하기"
                        className={isRight ? "codeButtonStyleRight" : "codeButtonStyle"}
                        onClick={checkVerificationCode}
                    />
                </div>
            )}
        </div>
    );
};

export default InputField;