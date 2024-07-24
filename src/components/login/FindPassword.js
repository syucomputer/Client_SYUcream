import InputField from "../inputfield/InputField";
import Button from "../button/Button";
import React, {useState} from "react";
import "./Login.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useToast from "../toast/useToast";

const FindPassword = () => {
  const [state, setState] = useState({
    name: "",
    id: "",
    email: "",
  });
  const [wrong, setWrong] = useState(true);
  const navigate = useNavigate();
  const showToast = useToast()

  const handleChangeState = (name, value) => {
      setState({
        ...state,
        [name]: value,
      });
  };

  const handlePassword = () => {
    axios.post(`http://localhost:8080/member/password/reset`, {
      name: state.name,
      memId: state.id,
      email: state.email
    })
      .then(response => {
        console.log(response.data)
        showToast('임시 비밀번호를 전송했습니다.','success')
      })
      .catch(error => {
        console.log('정보를 잘못 입력하였습니다.', error)
        showToast('정보를 잘못 입력하였습니다.','error')
        setWrong(false)
      })
  }

  return (
    <div>
      <div className="login-form">
        <h2 className="center">비밀번호 찾기</h2>
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
          post={false}
          onChange={(value) => handleChangeState('email', value)}
        />
        <Button
          label={wrong ? '전송하기' : '재전송하기'}
          className={state.name && state.id && state.email ? "post-button button-fill" : "post-button"}
          onClick={handlePassword}
        />
      </div>
      <div className="center">
        <Button
          label="로그인"
          className="go-button"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  )
}

export default FindPassword;