import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";

const RoadmapPage = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      <Nav />
      <Outlet />
    </div>
  );
};

export default RoadmapPage;
