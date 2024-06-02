import { useEffect, useState } from "react";
import img from "../assets/university.png"
import sun from '../assets/sun.png';
import moon from '../assets/full-moon.png';
import { NavLink } from "react-router-dom";

const Header = () => {

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
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> Solutions </NavLink>

            <NavLink to="/all"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> Resources </NavLink>

            <NavLink to="/all"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black transition-all duration-200"> Pricing </NavLink>
        </>
    const linksEnd =
        <>
            <NavLink to="/"
                style={({ isActive }) => {
                    return {
                        background: isActive ? "black" : "transparent",
                        color: isActive ? "white" : "black",
                    };
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 rounded-xl border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"> Log in </NavLink>

            <NavLink to="/"
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
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-b from-rose-300 to-rose-400 rounded-box gap-y-2 w-[164px]">
                                {linksCenter}
                                {linksEnd}
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

                        <div className="hidden ml-6 lg:flex lg:items-center lg:justify-center lg:space-x-6">
                            {linksEnd}
                        </div>

                        <div className="ml-6 items-center justify-center">
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