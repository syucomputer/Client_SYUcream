import SignupPage from "../views/SignupPage";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import TrendsPage from "../views/TrendsPage";
import MyPage from "../views/MyPage";
import SubjectPage from "../views/SubjectPage";
import RoadmapPage from "../views/RoadmapPage";
import Temp from "../views/Temp";
import MyInfo from "../components/mypage/inside/MyInfo";
import MyRoadmap from "../components/mypage/inside/MyRoadmap";
import ManageRoadmap from "../components/mypage/inside/roadmap/ManageRoadmap";
import ReviewRoadmap from "../components/mypage/inside/roadmap/ReviewRoadmap";
import Roadmap from "../components/Roadmap/CreateRoadmap";

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
    path: "/mypage",
    element: <MyPage />,
    children: [
      {
        path: "info",
        element: <MyInfo />,
      },
      {
        path: "roadmap",
        element: <MyRoadmap />,
      },
      {
        path: "roadmap/:roadmapId",
        element: <MyRoadmap />,
      },
      {
        path: "roadmap/manage",
        element: <ManageRoadmap />,
      },
      {
        path: "roadmap/manage/:roadmapId",
        element: <ReviewRoadmap />,
      },
    ],
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
    children: [
      {
        path: "",
        element: <Roadmap />,
      },
    ]
  },
  {
    path: "/temp",
    element: <Temp />,
  },
];

export default routes;
