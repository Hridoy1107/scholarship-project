import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";
import Home from "../mainPages/Home";
import Login from "../userPages/Login";
import Register from "../userPages/Register";
import Dashboard from "../privatePages/Dashboard";
import UsersPage from "../DashPages/UsersPage";
import Profile from "../DashPages/Profile";
import AddScholarship from "../DashPages/AddScholarship";
import DashAllScholarships from "../DashPages/DashAllScholarships";
import EditScholarships from "../DashPages/EditScholarships";

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
                path: 'profile',
                element: <Profile></Profile> ,
            },
            {
                path: 'add-scholarship',
                element: <AddScholarship></AddScholarship> ,
            },
            {
                path: 'users',
                element: <UsersPage></UsersPage> ,
            },
            {
                path: 'dash-all-scholarships',
                element: <DashAllScholarships></DashAllScholarships> ,
            },
            {
                path: 'dash-all-scholarships/edit-scholarships/:id',
                element: <EditScholarships></EditScholarships> ,
                loader: ({params}) => fetch(`http://localhost:5000/scholarships/${params.id}`)
            },
        ]
    }
]);

export default Routes;