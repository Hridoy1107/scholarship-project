import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../components/ErrorPage";
import Home from "../mainPages/Home";
import Login from "../userPages/Login";
import Register from "../userPages/Register";

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
]);

export default Routes;