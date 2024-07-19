import Nav from "../components/nav/Nav";
import Main from "../components/main/Main";
import {useAuth} from "../components/login/AuthContext";
import {useContext} from "react";
import {StudentIdContext} from "../components/signup/StudentIdContext";

const HomePage = () => {
  const { isLoggedIn } = useAuth()
  const { studentId } = useContext(StudentIdContext);


  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        position: "relative",
        backgroundColor: "#E7ECFF",
      }}
    >
      <Nav isLoggedIn={isLoggedIn}/>
      <Main />
    </div>
  );
};

export default HomePage;
