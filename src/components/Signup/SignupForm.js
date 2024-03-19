import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";

const SignupForm = ({ onStepChange }) => {
  const [state, setState] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
    passwordR: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
  const handleNext = () => {
    onStepChange(2);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>계정 만들기</h2>
      <InputField
        type="text"
        label="이름"
        value={state.name}
        onChange={handleChangeState}
      />
      <InputField
        type="text"
        label="학번"
        value={state.id}
        onChange={handleChangeState}
      />
      <InputField
        type="text"
        label="이메일"
        value={state.email}
        onChange={handleChangeState}
      />
      <InputField
        type="password"
        label="비밀번호"
        value={state.password}
        onChange={handleChangeState}
      />
      <InputField
        type="password"
        label="비밀번호 확인"
        value={state.passwordR}
        onChange={handleChangeState}
      />
      <Button
        label="다음으로"
        onClick={handleNext}
        className="nextButtonStyle"
      />
      <div style={{ fontSize: "12px", textAlign: "center", marginTop: "6px" }}>
        계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
      </div>
    </div>
  );
=======
    const handleChangeState = (name, value) => {
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = await axios.post('http://localhost:8080/member/save', {
                memId: state.id,
                name: state.name,
                email: state.email,
                password: state.password,
                passwordCheck: state.passwordR
            });

            // 백엔드에서 로그인 처리 후 클라이언트에서 응답 처리
            if (request.status === 200) {
                console.log('회원가입 성공:', request.data);
            } else {
                console.error('회원가입 실패:', request.data);
                // 로그인 실패 시 사용자에게 알림 또는 다른 처리 수행
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    }

    const handleNext = () => {
        onStepChange(2);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>계정 만들기</h2>
                <InputField
                    type="text"
                    label="이름"
                    value={state.name}
                    onChange={(value) => handleChangeState('name', value)}
                />
                <InputField
                    type="text"
                    label="학번"
                    value={state.id}
                    onChange={(value) => handleChangeState('id', value)}
                />
                <InputField
                    type="text"
                    label="이메일"
                    value={state.email}
                    onChange={(value) => handleChangeState('email', value)}
                />
                <InputField
                    type="password"
                    label="비밀번호"
                    value={state.password}
                    onChange={(value) => handleChangeState('password', value)}
                />
                <InputField
                    type="password"
                    label="비밀번호 확인"
                    value={state.passwordR}
                    onChange={(value) => handleChangeState('passwordR', value)}
                />
                <button type="submit"> 다음으로 </button>
                <div style={{ fontSize: "12px", textAlign: "center", marginTop: "6px" }}>
                    계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
                </div>
            </form>
        </div>
    );
>>>>>>> master
};

export default SignupForm;
