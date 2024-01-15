import React, { useState } from 'react';
import Button from "./Button";

const InputField = ({ type, label, value, onChange }) => {
    const isEmailField = label === '이메일'; // 이메일 필드 여부를 판별
    const [isEmail, setIsEmail] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isFailCode, setIsFailCode] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('인증하기');
    const [verificationCode, setVerificationCode] = useState('');

    // email 보내는 로직
    const postEmail = () =>{
        setIsEmail(true);
        setButtonLabel('재전송하기');
    }

    const handleCodeChange = (e) => {
        const code = e.target.value;
        const filteredValue = code.replace(/[^A-Za-z0-9]/g, '');    // 정규 표현식(영문, 숫자)
        setVerificationCode(filteredValue);

        if(code.length === 6) setIsRight(true);
        else setIsRight(false);
    }

    const buttonStyle = {
        width: '90px',
        height: '30px',
        backgroundColor: '#4084FF',
        color: '#ffffff',
        position: 'absolute',
        right: 0
    }

    const codeButtonStyle = {
        width: '80px',
        height: '30px',
        marginLeft: '10px',
        backgroundColor: isRight ? '#4084FF' : '#D9D9D9'
    }

    const checkBoxStyle = {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: 0,
    }

    const rightEmailCode = () => {
        if (verificationCode === 'hello1') {
            setIsEmail(false);
            setIsFailCode(false);
            setIsSuccess(true);
        } else {
            setIsFailCode(true);
            setVerificationCode('');
        }
    }

    return (
        <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label style={{ color: '666666' }}>{label}</label>
            <br />
            <div style={{ marginTop: '5px' }}>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        ...(isEmailField && {
                            width: '35%',
                        }),
                    }}
                />
                {isEmailField &&
                    <>
                        <label>@syuin.ac.kr</label>
                        {!isSuccess && <Button label={buttonLabel} style={buttonStyle} onClick={postEmail}/>}
                        {isSuccess && <input type="checkbox" checked readOnly style={checkBoxStyle} />}
                    </>
                }
            </div>
            {isEmailField && isEmail && (
                <div style={{ marginTop: '10px', textAlign: 'center'}}>
                    <label>인증코드 </label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={handleCodeChange}
                        style={{
                            width: '80px',
                            borderRadius: '0',
                            border: 'none',
                            borderBottom: '1px solid black',
                            textAlign: 'center'
                        }}
                        maxLength='6'
                    />
                    {isFailCode && <label style={{ marginLeft: '8px',color: 'red' }}>인증 실패!</label>}
                    <Button label='인증하기' style={codeButtonStyle} onClick={rightEmailCode}/>
                </div>
            )}
        </div>
    );
};

export default InputField;
