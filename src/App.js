import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import { AuthProvider } from "./components/Login/AuthContext";
import Modal from "react-modal";
import {ToastContainer} from "react-toastify"; // react-modal 라이브러리에서 Modal을 import

Modal.setAppElement("#root"); // App의 루트 엘리먼트를 지정
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact={route.exact}
            />
          ))}
        </Routes>
          <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
