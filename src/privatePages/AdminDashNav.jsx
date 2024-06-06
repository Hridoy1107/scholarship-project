import { IoIosArrowDropdown } from "react-icons/io";
import { NavLink } from "react-router-dom";


const AdminDashNav = () => {

    const linksCenter =
    <>
        <NavLink to="profile"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">Profile</NavLink>

        <NavLink to="add-scholarship"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">Add Scholarship</NavLink>
        <NavLink to="all-applications"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> All Applications</NavLink>
            <NavLink to="admin-all-scholarships"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> All Scholarships</NavLink>
            <NavLink to="all-reviews"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> All Reviews</NavLink>
            <NavLink to="users"
            style={({ isActive }) => {
                return {
                    background: isActive ? "teal" : "white",
                    color: isActive ? "white" : "black",
                    border: isActive ? "teal" : "",
                };
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">Users</NavLink>
    </>

    return (
        <>
            <div className="dropdown" style={{ position: 'relative', zIndex: 999}}>
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <IoIosArrowDropdown className="w-10 h-10" />
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box gap-y-2 w-[200px]">
                    {linksCenter}
                </ul>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-6">
                {linksCenter}
            </div>
        </>
    );
};

export default AdminDashNav;