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
import AllScholarships from "../privatePages/AllScholarships";
import Details from "../privatePages/Details";
import ApplyPage from "../privatePages/ApplyPage";
import Payment from "../payment/Payment";

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
                path: '/all-scholarships',
                element: <AllScholarships></AllScholarships>,
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><Details></Details></PrivateRoute> ,
                loader: ({params}) => fetch(`http://localhost:5000/scholarships/${params.id}`)
            },
            {
                path: '/apply-page/:id',
                element: <PrivateRoute><ApplyPage></ApplyPage></PrivateRoute> ,
                loader: ({params}) => fetch(`http://localhost:5000/scholarships/${params.id}`)
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment> </PrivateRoute> ,
                loader: ({params}) => fetch(`http://localhost:5000/scholarships/${params.id}`)
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
                path: 'all-scholarships',
                element: <DashAllScholarships></DashAllScholarships> ,
            },
            {
                path: 'all-scholarships/edit-scholarships/:id',
                element: <EditScholarships></EditScholarships> ,
                loader: ({params}) => fetch(`http://localhost:5000/scholarships/${params.id}`)
            },
        ]
    }
]);

export default Routes;