import React, { useState } from "react";
import { useAuth } from "../login/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./MyProfile.css";
import Button from "../button/Button";
import useToast from "../toast/useToast";
import axios from "axios";

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  // // 알람이 올때 api
  // useEffect(() => {
  //   axios.get(``)
  //     .then((response) => {
  //       console.log('문제 없음', response.data)
  //     })
  //     .catch((error) => {
  //       console.log('문제 발생', error)
  //     })
  // }, []);

  // 만약 로그인한 사용자의 정보가 없다면 로그인 페이지로 리다이렉트
  if (!user) {
    return <Link to="/" />;
  }

  // 정보수정 로직 수정해야함
  const handlerEdit = () => {
    if (showPassword) {
      axios.post('http://localhost:8080/member/login', {
        memId : user.memId,
        password : password,
      })
        .then(response => {
          console.log(response.data)
          setShowPassword(!showPassword);
        })
        .catch(error => {
          console.log('비밀번호를 입력해주세요.', error)
          showToast('비밀번호를 입력해주세요', 'error')
        })
    } else {
      axios.put('http://localhost:8080/member/password/update', {
          currentPassword: password,
          newPassword: newPassword,
          newPasswordCheck: confirmPassword,
        })
        .then(response => {
          console.log(response.data)
          setShowPassword(!showPassword);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
          showToast('비밀번호가 변경되었습니다.', 'success')
        })
        .catch(error => {
          console.log('비밀번호가 일치하지 않습니다.', error)
          showToast('비밀번호가 일치하지 않습니다.', 'error')
        })
    }
  }

  const handlerHome = () => {
    navigate("/mypage/info");
  }
  const handlerRoadmap = () => {
    navigate("/mypage/roadmap")
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <img className="alarm" src={"/profile/alarm.jpg"} alt="alarm"/>
        <div className="profile-img"></div>
        <Button label={showPassword ? '비밀번호 수정' : '저장'} className="edit-button" onClick={handlerEdit}/>
        <table style={{width: '100%', borderSpacing: '8px', marginTop: 'auto'}}>
          <thead style={{fontSize: '30px'}}>
            <tr>
              <th colSpan="2">{user?.name || ''}</th>
            </tr>
          </thead>
          <tbody style={{textAlign: 'left'}}>
            <tr>
              <td>이름</td>
              <td>{user?.memId || ''}</td>
            </tr>
            <tr>
                <td>이메일</td>
                <td>{user?.email || ''}</td>
            </tr>
            {showPassword ? (
                <tr>
                  <td>비밀번호</td>
                  <td>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td>새 비밀번호</td>
                    <td>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>비밀번호 확인</td>
                    <td>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                </>
              )
            }
          </tbody>
        </table>
      </div>
      {user.division === '학생' &&
        <>
          <Button label="홈" className="home-button" onClick={handlerHome}/>
          <Button label="로드맵" className="roadmap-button" onClick={handlerRoadmap}/>
        </>
      }
    </div>
  );
};

export default MyProfile;