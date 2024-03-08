import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (id, password) => {
        try {
            // 실제 로그인 API 호출
            const response = await fetch('http://localhost:8080/member/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memId: id,
                    password: password }),
            });

            if (response.ok) {
                // 로그인 성공 시 사용자 정보 업데이트
                const result = await response.json();
                const userInfo = result.result.userInfo;
                setUser(userInfo);
            } else {
                console.error('로그인 실패');
                throw new Error('로그인 실패'); // 로그인 실패 시 예외 던지기
            }

            // // 아이디와 비밀번호가 특정 값일 때에만 로그인 성공
            // if (id === "2020101467" && password === "password123") {
            //     const fakeUserData = { id: "2020101467", name: "황서윤", division: "student" };
            //     setUser(fakeUserData);
            // } else {
            //     throw new Error('로그인 실패');
            // }
        } catch (error) {
            console.error('로그인 오류', error);
            throw error; // 로그인 오류 시 예외 던지기
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
