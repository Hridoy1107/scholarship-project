import { useContext, useEffect, useState } from "react";
import img from "../assets/university.png"
import sun from '../assets/sun.png';
import moon from '../assets/full-moon.png';
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {

    const location = useLocation();
    
    const isActive = location.pathname.startsWith("/dashboard");

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You have to log in again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log out!'
        }).then((result) => {
            if (result.isConfirmed)
                logOut()
                    .then(() => console.log('user logged out successfully'),
                        Swal.fire({
                            title: 'Success!',
                            text: 'User Log Out Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        }))
                    .catch(error => console.error(error))
        })

    }

    const linksCenter =
        <>
            <NavLink to="/"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200">Home</NavLink>

            <NavLink to="/all"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> All Scholarships </NavLink>

            <NavLink to="/dashboard/profile"
                 style={{
                     background: isActive ? "black" : "transparent",
                     color: isActive ? "white" : "black",
                 }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> Dashboard </NavLink>

        </>
    const linksEnd =
        <>
            <NavLink to="/login"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"> Log in </NavLink>

            <NavLink to="/register"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white" role="button">Sign Up</NavLink>
        </>
    return (
        <>
            <div className="bg-gradient-to-b from-green-200 to-green-400 rounded-xl">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="dropdown" style={{ position: 'relative', zIndex: 1000 }}>
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-b from-rose-300 to-rose-400 rounded-box gap-y-2 w-[164px]">
                                {linksCenter}
                                {user ?
                                <></> : <>{linksEnd}</>
                                }
                            </ul>
                        </div>
                        <div className="flex-shrink-0 flex gap-x-2">
                            <img className="w-auto h-8" src={img} alt="" />
                            <h1 className="font-semibold text-black text-2xl"> Uni Aid</h1>
                        </div>

                        <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-6">
                            {linksCenter}
                            <div className="w-px h-5 bg-black/40"></div>
                        </div>

                        <div className="ml-6 lg:flex lg:items-center lg:justify-center lg:space-x-6">
                        {
                            user ?
                                <>
                                    <div className="mr-3 avatar tooltip tooltip-hover" >
                                    </div>
                                    <div className="dropdown mt-2 lg:ml-2" style={{ position: 'relative', zIndex: 1000 }}>
                                        <div tabIndex={0} role="button" className="btn tooltip tooltip-hover btn-ghost btn-circle" data-tip={user.displayName}>
                                            <img className="rounded-full h-full w-full" src={user.photoURL} />
                                        </div>
                                        <div>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 gap-y-1 shadow bg-base-100 rounded-box w-[135px]">
                                                <li><a onClick={handleLogOut} className="btn w-[120px] h-[48px] bg-[red] hover:bg-[red] text-[#FFFFFF]">Log out</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="hidden lg:flex gap-4">{linksEnd}</div>
                                </>
                        }
                        </div>

                        <div className="lg:ml-6 ml-2 items-center justify-center">
                            <label className="swap w-8 h-8 lg:w-10 lg:h-10 swap-rotate">
                                <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} className="theme-controller" />
                                <img className="swap-off fill-current w-8 h-8 lg:w-10 lg:h-10 mt-2" src={sun} alt="" />
                                <img className="swap-on fill-current w-8 h-8 lg:w-10 lg:h-10 mt-2" src={moon} alt="" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;