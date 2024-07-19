import Trends from "../components/trend/Trends";
import Nav from "../components/nav/Nav";

const SignupPage = () => {
  return (
    <div
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Nav />
      <Trends />
    </div>
  );
};

export default SignupPage;
