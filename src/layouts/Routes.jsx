import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../components/ErrorPage";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage> ,
        children: [
            {
                path: '/',
                element: <h1 className="text-red-500">Hi to home</h1> ,
            },
            {
                path: '/all',
                element: <h1 className="text-red-500">Hi to all</h1> ,
            },
        ]
    },
]);

export default Routes;