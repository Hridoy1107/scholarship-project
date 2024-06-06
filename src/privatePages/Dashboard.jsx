import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UserDashNav from "./UserDashNav";
import AdminDashNav from "./AdminDashNav";
import ModDashNav from "./ModDashNav";

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <>
            <Header></Header>
            <>
                <div>
                    <h1 className="mt-2 font-semibold text-xl lg:text-3xl">
                        Welcome to Dashboard
                    </h1>
                </div>
            </>
            <div className="mb-4">
                <div>
                    {
                        users.map((user) => (
                            <div key={user._id}>
                                {user.role === 'admin' ?
                                    <><AdminDashNav></AdminDashNav></> :
                                    user.role === 'moderator' ?
                                        <><ModDashNav></ModDashNav></> :
                                        <><UserDashNav></UserDashNav></>}
                            </div>
                        ))
                    }
                </div>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;