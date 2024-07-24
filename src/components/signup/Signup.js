import React, { useRef, useState} from "react";
import InputField from "../inputfield/InputField";
import axios from "axios";
import useToast from "../toast/useToast";
import "./Signup.css"
import Button from "../button/Button";
import {useNavigate, useOutletContext} from "react-router-dom";

const Signup = () => {
  const { handleStudentIdChange } = useOutletContext();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
    passwordR: "",
    studentId: "", // 학번 추가
  });

  const stateFill =
    state.name &&
    state.id &&
    state.email &&
    state.password &&
    state.passwordR

  const [isSuc, setIsSuc] = useState(false);
  const showToast = useToast();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChangeState = (name, value) => {
    if (name === "id") {
      setState({
        ...state,
        [name]: value,
      });
      handleStudentIdChange(value); // 학번 업데이트
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSuc) {
      // 이메일 인증이 되지 않은 경우, 회원가입을 진행하지 않음
      showToast('이메일이 인증되지 않았습니다.', 'error');
      emailRef.current.focus();
    } else if (
      (state.password === null || state.passwordR === null)
        && state.password !== state.passwordR
    ) {
      // 비밀번호가 일치하지 않을 때, 회원가입을 진행하지 않음
      showToast('비밀번호가 서로 일치하지 않습니다.', 'error');
      passwordRef.current.focus();
    } else {
      try {
        const request = await axios.post('http://localhost:8080/member/save', {
          memId: state.id,
          name: state.name,
          email: state.email,
          password: state.password,
          passwordCheck: state.passwordR
        });

        if (request.status === 200) {
          console.log('회원가입 성공:', request.data);
          showToast('회원가입에 성공하셨습니다!!','success')
          navigate('/signup/area-of-interest')
        } else {
          console.error('회원가입 실패:', request.data);
        }
      } catch (error) {
          console.error('회원가입 오류:', error);
      }
    }
  }

  return (
    <div>
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
        ref={emailRef}
        onVerificationSuccess={() => setIsSuc(true)}
        post={true}
      />
      <InputField
        type="password"
        label="비밀번호"
        value={state.password}
        ref={passwordRef}
        onChange={(value) => handleChangeState('password', value)}
      />
      <InputField
        type="password"
        label="비밀번호 확인"
        value={state.passwordR}
        onChange={(value) => handleChangeState('passwordR', value)}
      />
      <Button label="다음으로" className={stateFill ? "next-button button-fill" : "next-button"} onClick={handleSubmit} />
      <div className="label">
        계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
      </div>
    </div>
  );
};

export default Signup;
