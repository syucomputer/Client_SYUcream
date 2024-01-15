import SignupPage from '../views/SignupPage';
import LoginPage from "../views/LoginPage";
import HomePage from '../views/HomePage';

const routes = [
    {
        path: '/',
        element: <HomePage />,
        exact: true
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
];

export default routes;
