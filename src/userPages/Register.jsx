import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signInWithGoogle, facebookLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleRegister = async e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoFile = e.target.elements.photo.files[0];
        console.log(photoFile);


        setRegisterError('');


        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }

        const formData = new FormData();
        formData.append('image', photoFile);

        try {
            const uploadRes = await axios.post(image_hosting_api, formData);
            const photoURL = uploadRes.data.data.display_url;

            // Create user with email and password
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            console.log(user);

            // Update user profile with the photo URL
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            });

            // Save the user in your database
            const userData = { email, name };
            await axiosPublic.post('/users', userData);

            navigate('/');
            Swal.fire({
                title: 'Success!',
                text: 'User Registered Successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
            });
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                const email = result.user.email;
                const name = result.user.displayName;
                const user = {email, name};
                axiosPublic.post('/users', user)
                navigate('/');
                Swal.fire({
                    title: 'Success!',
                    text: 'User Registered Successfully',
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
                navigate('/');
                Swal.fire({
                    title: 'Success!',
                    text: 'User Registered Successfully',
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
                navigate('/');
                Swal.fire({
                    title: 'Success!',
                    text: 'User Registered Successfully',
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
                        <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">Please Register</h2>
                        <p className="font-medium mb-2 px-2 mx-2">Join Our Scholarship Community Today to Explore, Apply, and Stay Informed About the Latest Scholarship Opportunities!</p>
                        <form onSubmit={handleRegister}>
                            <div className="mx-2">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input className="mb-4 w-full rounded-xl py-2 px-4" type="text" name="name" placeholder="Your Name" id="Name" required />
                            </div>
                            <div className="mx-2">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input className="mb-4 w-full rounded-xl py-2 px-4" type="email" name="email" placeholder="Email Address" id="Email" required />
                            </div>
                            <div className="mx-2">
                                <label className="label">
                                    <span className="label-text font-medium">User Photo</span>
                                </label>
                                <input className="mb-4 w-full rounded-xl py-2 px-4" type="file" name="photo" required id="Photo" />
                            </div>
                            <div className="mb-4 mx-2 relative border-none">
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
                                <input className="btn btn-warning mb-4 w-full" type="submit" value="Register" />
                            </div>
                        </form>
                        {
                            registerError && <p className="text-red-600 font-medium">{registerError}</p>
                        }
                        <h1 className="font-semibold">Register with other accounts</h1>
                        <div className="mx-auto w-1/2 lg:w-1/4">
                            <div className="flex gap-3 my-1">
                                <div onClick={handleGoogleSignIn} className="btn btn-outline h-12 w-12"><FaGoogle /></div>
                                <div onClick={handleFacebookSignIn} className="btn btn-outline h-12 w-12"><FaFacebook /></div>
                                <div onClick={handleGithubSignIn} className="btn btn-outline h-12 w-12"><FaGithub /></div>
                            </div>
                        </div>
                        <p className="text-center mt-4">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;