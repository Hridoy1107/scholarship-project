import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";
import Home from "../mainPages/Home";
import Login from "../userPages/Login";
import Register from "../userPages/Register";
import Dashboard from "../privatePages/Dashboard";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage> ,
        children: [
            {
                path: '/',
                element: <Home></Home> ,
            },
            {
                path: '/all',
                element: <h1 className="text-red-500">Hi to all</h1> ,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'i',
                element: <h1 className="text-8xl">Hello to I</h1> ,
            },
            {
                path: 'j',
                element: <h1 className="text-8xl">Hello to J</h1> ,
            },
        ]
    }
]);

export default Routes;