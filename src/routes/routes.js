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
import Roadmap from "../components/roadmap/CreateRoadmap";
import SelectJob from "../components/roadmap/SelectJob";
import Signup from "../components/signup/Signup";
import AreaOfInterest from "../components/signup/AreaOfInterest";
import Course from "../components/signup/Course";
import ProManageRoadmap from "../components/roadmap/ProManageRoadmap";

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
    children: [
      {
        path: "",
        element: <Signup />,
      },
      {
        path: "area-of-interest",
        element: <AreaOfInterest />,
      },
      {
        path: "course",
        element: <Course />,
      },
    ]
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
    path: "/trend",
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
      {
        path: "jobs",
        element: <SelectJob />,
      },
      {
        path: "pro-manage",
        element: <ProManageRoadmap />,
      }
    ]
  },
  {
    path: "/temp",
    element: <Temp />,
  },
];

export default routes;
