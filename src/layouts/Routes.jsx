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
import MyApplications from "../DashPages/MyApplications";
import EditApplication from "../DashPages/EditApplication";
import AllApplications from "../DashPages/AllApplications";
import AdminAllApplications from "../DashPages/AdminAllApplications";
import MyReviews from "../DashPages/MyReviews";
import ModminRoute from "./ModminRoute";
import AdminRoute from "./AdminRoute";
import AllReviews from "../DashPages/AllReviews";
import Charts from "../DashPages/Charts";

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
                loader: ({params}) => fetch(`https://scholarship-server.vercel.app/scholarships/${params.id}`)
            },
            {
                path: '/apply-page/:id',
                element: <PrivateRoute><ApplyPage></ApplyPage></PrivateRoute> ,
                loader: ({params}) => fetch(`https://scholarship-server.vercel.app/scholarships/${params.id}`)
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment> </PrivateRoute> ,
                loader: ({params}) => fetch(`https://scholarship-server.vercel.app/scholarships/${params.id}`)
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
                path: 'my-applications',
                element: <MyApplications></MyApplications> ,
            },
            {
                path: 'my-applications/edit-application/:id',
                element: <EditApplication></EditApplication> ,
                loader: ({params}) => fetch(`https://scholarship-server.vercel.app/applications/${params.id}`)
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews> ,
            },

            {
                path: 'add-scholarship',
                element: <ModminRoute><AddScholarship></AddScholarship></ModminRoute> ,
            },
            {
                path: 'all-scholarships',
                element: <ModminRoute><DashAllScholarships></DashAllScholarships></ModminRoute> ,
            },
            {
                path: 'all-scholarships/edit-scholarships/:id',
                element: <ModminRoute><EditScholarships></EditScholarships></ModminRoute> ,
                loader: ({params}) => fetch(`https://scholarship-server.vercel.app/scholarships/${params.id}`)
            },
            {
                path: 'all-applications',
                element: <ModminRoute><AllApplications></AllApplications></ModminRoute> ,
            },
            {
                path: 'all-reviews',
                element: <ModminRoute><AllReviews></AllReviews></ModminRoute> ,
            },

            {
                path: 'users',
                element: <AdminRoute><UsersPage></UsersPage></AdminRoute> ,
            },
            {
                path: 'admin-all-applications',
                element: <AdminRoute><AdminAllApplications></AdminAllApplications></AdminRoute> ,
            },
            {
                path: 'charts',
                element: <AdminRoute><Charts></Charts></AdminRoute> ,
            },
        ]
    }
]);

export default Routes;