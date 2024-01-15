import React, {useState} from "react";
import InputField from "./InputField";
import Button from "./Button";

const Signup = () =>{
    // 회원가입 페이지에서 받아오는 데이터
    const [state, setState] = useState({
        name: '',
        id: '',
        email: '',
        password: '',
        passwordR: ''
    })

    const [next, setNext] = useState(false);

    const buttonStyle = {
        width: '100%',
        height: '40px',
    }

    // 화면에 글자 보이게 하는 로직
    const handleChangeState = (e) =>{
        setState({
            [e.target.name]: e.target.value,
        });
    }

    const handleNext = () => {
        setNext(!next);
    }

    return (
        <div style={{
            width: '500px',
            height: '600px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            position: 'absolute'
        }}>
            <h2 style={{textAlign: 'center'}}>계정 만들기</h2>
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
            <Button label='다음으로' onClick={handleNext} style={buttonStyle}/>
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '6px'}}>
                계정을 만들고 사용 약관 및 개인 정보 보호 정책에 동의합니다.
            </div>
        </div>
    )
}

export default Signup