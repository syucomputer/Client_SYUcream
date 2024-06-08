import SignupPage from "../views/SignupPage";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import TrendsPage from "../views/TrendsPage";
import MyPage from "../views/MyPage";
import SubjectPage from "../views/SubjectPage";
import RoadmapPage from "../views/RoadmapPage";
import Temp from "../views/Temp";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    exact: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/mypage/*",
    element: <MyPage />,
  },
  {
    path: "/trends",
    element: <TrendsPage />,
  },
  {
    path: "/subject",
    element: <SubjectPage />,
  },
  {
    path: "/roadmap",
    element: <RoadmapPage />,
  },
  {
    path: "/temp",
    element: <Temp />,
  },
];

export default routes;
