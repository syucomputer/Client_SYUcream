import React, {useRef, useState} from "react";
import InputField from "../InputField/InputField";
import axios from "axios";
import useToast from "../Toast/useToast";
import "./Signup.css"
import Button from "../Button/Button";

const SignupForm = ({ onStepChange, onStudentIdChange }) => {
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
        setState({
            ...state,
            [name]: value,
        });
        if (name === "id") {
            onStudentIdChange(value); // 학번 변경 시 부모 컴포넌트로 학번 전달
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSuc) {
            // 이메일 인증이 되지 않은 경우, 회원가입을 진행하지 않음
            showToast('이메일이 인증되지 않았습니다.', 'error');
            emailRef.current.focus();
        } else if (state.password !== state.passwordR) {
            // 비밀번호가 일치하지 않을 때, 회원가입을 진행하지 않음
            showToast('비밀번호가 서로 일치하지 않습니다.', 'error');
            passwordRef.current.focus();
        } else {
            try {
                const request = await axios.post('/member/save', {
                    memId: state.id,
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    passwordCheck: state.passwordR
                });

                // 백엔드에서 로그인 처리 후 클라이언트에서 응답 처리
                if (request.status === 200) {
                    console.log('회원가입 성공:', request.data);
                    showToast('회원가입에 성공하셨습니다!!','success')
                    onStepChange(2);
                } else {
                    console.error('회원가입 실패:', request.data);
                    // 로그인 실패 시 사용자에게 알림 또는 다른 처리 수행
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
            <Button label="다음으로" className={stateFill ? "NextButton ButtonFill" : "NextButton"} onClick={handleSubmit} />
            <div className="Label">
                계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
            </div>
        </div>
    );
};

export default SignupForm;
