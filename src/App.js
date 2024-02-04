import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import {AuthProvider} from "./components/Login/AuthContext";

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
        </AuthProvider>
    </Router>
  );
};

export default App;
