import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Login/AuthContext";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import routes from "./routes/routes";
import "./App.css"
import {StudentIdProvider} from "./components/Signup/StudentIdContext";

Modal.setAppElement("#root");

const App = () => {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      );
    });
  };

  return (
    <Router>
      <AuthProvider>
        <StudentIdProvider>
          <Routes>
            {renderRoutes(routes)}
          </Routes>
          <ToastContainer />
        </StudentIdProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
