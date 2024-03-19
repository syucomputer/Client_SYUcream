import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(null);

  const login = async (id, password) => {
    try {
      // // 실제 로그인 API 호출
      // const response = await fetch('your_login_api_endpoint', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ id, password }),
      // });
      //
      // if (response.ok) {
      //     // 로그인 성공 시 사용자 정보 업데이트
      //     const result = await response.json();
      //     const userInfo = result.result.userInfo;
      //     setUser(userInfo);
      // } else {
      //     console.error('로그인 실패');
      //     throw new Error('로그인 실패'); // 로그인 실패 시 예외 던지기
      // }

      // 아이디와 비밀번호가 특정 값일 때에만 로그인 성공
      if (id === "2020101467" && password === "password123") {
        const fakeUserData = {
          id: "2020101467",
          name: "황서윤",
          division: "student",
        };
        setUser(fakeUserData);
      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      throw error; // 로그인 오류 시 예외 던지기
    }
  };

  const logout = () => {
    setUser(null);
  };
=======
    const [user, setUser] = useState(false);

    const login = async (id, password) => {
        // 여기에서 로그인 API 호출 또는 로그인 로직을 처리합니다.
        // 실제 프로젝트에서는 비동기 작업이 포함될 수 있습니다.
        // 예: const response = await axios.post('/login', credentials);

        // 로그인이 성공하면 전역 상태를 업데이트합니다.
        setUser(true);
    };

    const logout = () => {
        setUser(false);
    };
>>>>>>> master

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
