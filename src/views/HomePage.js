import Nav from "../components/Nav/Nav";
import Main from "../components/Main/Main";
import {useAuth} from "../components/Login/AuthContext";

const HomePage = () => {
    const { isLoggedIn } = useAuth()

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
