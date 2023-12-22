import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/main/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/login/Login";
import Register from "../pages/register/register/Register";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import PrivateRoute from "../private-route/PrivateRoute";
import Performance from "../pages/performance/performance/Performance";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: "performance",
                element: <PrivateRoute><Performance/></PrivateRoute>
            }
        ]
    }
]);

export default routes;