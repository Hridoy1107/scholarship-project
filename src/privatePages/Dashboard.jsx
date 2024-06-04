import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DashNav from "./DashNav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UserDashNav from "./UserDashNav";

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
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
            <div className="my-8">
                <div>
                    {
                        users.map((user2) => (
                            <div key={user2._id}>
                                {user2.role === 'admin' ?
                                    <><DashNav></DashNav></> :
                                    user2.role === 'moderator' ?
                                        <><DashNav></DashNav></> :
                                        <><UserDashNav></UserDashNav></>}
                            </div>
                        ))
                    }
                </div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;