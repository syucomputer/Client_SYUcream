import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Login/AuthContext";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import routes from "./routes/routes";
import "./App.css"

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
        <Routes>
          {renderRoutes(routes)}
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
