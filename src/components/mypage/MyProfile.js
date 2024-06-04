import React, {useEffect, useState} from "react";
import { useAuth } from "../Login/AuthContext";
import { Link } from "react-router-dom";
import "./MyProfile.css";
import Button from "../Button/Button";
import useToast from "../Toast/useToast";
import axios from "axios";

const MyProfile = ({ onChange }) => {
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const showToast = useToast();

    // 알람이 올때 api
    useEffect(() => {
        axios.get(``)
            .then((response) => {
                console.log('문제 없음', response.data)
            })
            .catch((error) => {
                console.log('문제 발생', error)
            })
    }, []);

    // 만약 로그인한 사용자의 정보가 없다면 로그인 페이지로 리다이렉트
    if (!user) {
        // 예시로 홈 페이지로 리다이렉트하도록 설정
        // 실제로는 로그인 페이지나 다른 페이지로 리다이렉트하도록 수정
        return <Link to="/" />;
    }

    // 정보수정 로직 수정해야함
    const handlerEdit = () => {
        setShowPassword(!showPassword);
    }

    // 비밀번호를 '*'로 가려서 보여주는 함수
    // const maskPassword = (password) => {
    //     return password ? (showPassword ? password : "*".repeat(password.length)) : '';
    // };

    const handlerHome = () => {
        onChange(true);
    }
    const handlerRoadmap = () => {
        onChange(false);
    }

    return (
        <div>
            <div className="profile-container">
                <img className="alarm" src={"/profile/alarm.jpg"} alt="alarm"/>
                <div className="profile-img"></div>
                <Button label="정보 수정" className="editButton" onClick={handlerEdit}/>
                <table style={{width: '100%', borderSpacing: '8px', marginTop: 'auto'}}>
                    <thead style={{ fontSize: '30px'}}>
                    <tr>
                        <th colSpan="2">{user?.name || ''}</th>
                    </tr>
                    </thead>
                    <tbody style={{ textAlign: 'left' }}>
                    <tr>
                        <td>이름</td>
                        <td>{user?.memId || ''}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{user?.email || ''}</td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <td>비밀번호</td>*/}
                    {/*    <td>{maskPassword(user?.password || '')}</td>*/}
                    {/*</tr>*/}
                    </tbody>
                </table>
            </div>
            <Button label="홈" className="homeButton" onClick={handlerHome}/>
            <Button label="로드맵" className="roadmapButton" onClick={handlerRoadmap}/>
        </div>
    );
};

export default MyProfile;