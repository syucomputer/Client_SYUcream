import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const StudentIdContext = createContext();

export const StudentIdProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(() => {
    return localStorage.getItem('studentId') || '';
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 언로드 될 때 studentId를 삭제합니다.
    const handleUnload = () => {
      if (studentId && (window.location.pathname.startsWith('/signup/area-of-interest') || window.location.pathname.startsWith('/signup/course'))) {
        localStorage.removeItem('studentId');
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [studentId]);

  // 새로고침 시 signup 페이지로 이동하는 로직
  useEffect(() => {
    if (!studentId && (window.location.pathname.startsWith('/signup/area-of-interest') || window.location.pathname.startsWith('/signup/course'))) {
      navigate('/signup');
    }
  }, [studentId, navigate]);

  return (
    <StudentIdContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentIdContext.Provider>
  );
};
