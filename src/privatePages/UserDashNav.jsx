import { NavLink } from "react-router-dom";


const UserDashNav = () => {

    const linksCenter =
        <>
            <NavLink to="profile"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "teal" : "transparent",
                        color: isActive ? "white" : "black",
                        border: isActive ? "teal" : "",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">Profile</NavLink>

            <NavLink to="my-reviews"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "teal" : "white",
                        color: isActive ? "white" : "black",
                        border: isActive ? "teal" : "",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">My Applications</NavLink>
            <NavLink to="my-applications"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "teal" : "white",
                        color: isActive ? "white" : "black",
                        border: isActive ? "teal" : "",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> My Reviews</NavLink>
        </>

    return (
        <>
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-6">
                {linksCenter}
            </div>
        </>
    );
};

export default UserDashNav;