import Footer from "../components/Footer";
import Header from "../components/Header";
import DashNav from "./DashNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <Header></Header>
            <div className="lg:flex my-8">
            <DashNav></DashNav>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;