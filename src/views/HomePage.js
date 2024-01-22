import Nav from "../components/Nav/Nav";
import Main from "../components/Main/Main";

const HomePage = () => {
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
        <Nav />
        <Main />
    </div>
  );
};

export default HomePage;
