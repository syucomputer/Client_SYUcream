import Trends from "../components/Trends/Trends";
import Nav from "../components/Nav/Nav";

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
