import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashDrop from "../components/DashDrop";

const DashNav = () => {
    return (
        <div className="flex">
            <SideNav />
        </div>
    );
};

const SideNav = () => {
    const [selected, setSelected] = useState(0);

    return (
        <>
        <div className="lg:hidden mx-32">
            <DashDrop></DashDrop>
        </div>
        <nav className="hidden p-4 lg:flex flex-col items-center gap-2">

            <Link to="i" >
                <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
                    <h1 className="text-white">Profile</h1>
                </NavItem>
            </Link>

            <Link to="j" >
                <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
                    <h1 className="text-white">Add Scholarship</h1>
                </NavItem>
            </Link>
            <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
            <h1 className="text-white">Applications</h1>
            </NavItem>
            <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
            <h1 className="text-white">All Scholarship</h1>
            </NavItem>
            <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
            <h1 className="text-white">Reviews</h1>
            </NavItem>
            <Link to="users" >
                <NavItem selected={selected === 5} id={5} setSelected={setSelected}>
                    <h1 className="text-white">Users</h1>
                </NavItem>
            </Link>
        </nav>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const NavItem = ({ children, selected, id, setSelected }) => {
    return (
        <motion.button
            className="p-3 text-xl w-44 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
            onClick={() => setSelected(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="block relative z-10">{children}</span>
            <AnimatePresence>
                {selected && (
                    <motion.span
                        className="absolute inset-0 rounded-md bg-indigo-600 z-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    ></motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default DashNav;