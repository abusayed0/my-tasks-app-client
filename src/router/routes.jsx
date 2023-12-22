import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/main/Main";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/login/Login";
import Register from "../pages/register/register/Register";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";

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
                element: <Dashboard/>
            }
        ]
    }
]);

export default routes;