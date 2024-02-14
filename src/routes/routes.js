import SignupPage from "../views/SignupPage";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import TrendsPage from "../views/TrendsPage";
import SubjectPage from "../views/SubjectPage";

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
    path: "/trends",
    element: <TrendsPage />,
  },
  {
    path: "/subjectRecommend",
    element: <SubjectPage />,
  },
];

export default routes;
