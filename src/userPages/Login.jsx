import { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2'
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, signInWithGoogle, facebookLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                e.target.reset();
                navigate(from, { replace: true });

                Swal.fire({
                    title: 'Success!',
                    text: 'User Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })

            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                const email = result.user.email;
                const name = result.user.displayName;
                const user = {email, name};
                axiosPublic.post('/users', user)
                navigate(from, { replace: true });

                Swal.fire({
                    title: 'Success!',
                    text: 'User Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleFacebookSignIn = () => {
        facebookLogin()
            .then(result => {
                console.log(result.user)
                const email = result.user.email;
                const name = result.user.displayName;
                const user = {email, name};
                axiosPublic.post('/users', user)
                navigate(from, { replace: true });

                Swal.fire({
                    title: 'Success!',
                    text: 'User Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleGithubSignIn = () => {
        githubLogin()
            .then(result => {
                console.log(result.user)
                const email = result.user.email;
                const name = result.user.displayName;
                const user = {email, name};
                axiosPublic.post('/users', user)
                navigate(from, { replace: true });
                
                Swal.fire({
                    title: 'Success!',
                    text: 'User Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <>
            <div>
                <div className="py-2 mt-8 rounded-xl flex">
                    <div className="mx-auto w-full lg:w-1/2 my-4 rounded-xl bg-base-200">
                        <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">Please Login</h2>
                        <p className="font-medium mb-2 px-2 mx-2">Enter Your Credentials to Access Your Personalized Scholarship Profile, Manage Submissions, Track Progress, and Connect with Advisors.</p>
                        <form onSubmit={handleLogin}>
                            <div className="mx-2">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input className="mb-4 w-full rounded-xl py-2 px-4" type="email" name="email" placeholder="Email Address" id="Email" required />
                            </div>
                            <div className="mb-4 relative mx-2 border-none">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <input
                                    className="w-full rounded-xl py-2 px-4"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    id="Password" required />
                                <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }

                                </span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="mx-2">
                                <input className="btn btn-success mb-4 w-full" type="submit" value="Login" />
                            </div>
                        </form>
                        <h1 className="font-semibold">Login with other accounts</h1>
                        <div className="mx-auto w-1/2 lg:w-1/4">
                            <div className="flex gap-3 my-1">
                                <div onClick={handleGoogleSignIn} className="btn btn-outline h-12 w-12"><FaGoogle /></div>
                                <div onClick={handleFacebookSignIn} className="btn btn-outline h-12 w-12"><FaFacebook /></div>
                                <div onClick={handleGithubSignIn} className="btn btn-outline h-12 w-12"><FaGithub /></div>
                            </div>
                        </div>
                        <p className="text-center mt-4">Don't have an account? <Link className="text-blue-600 font-bold" to="/register">Register</Link></p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;