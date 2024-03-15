import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
