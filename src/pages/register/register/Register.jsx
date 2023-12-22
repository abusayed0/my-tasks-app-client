import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import GoogleLogin from "../../../shared-components/social-login/googleLogin/GoogleLogin";

const Register = () => {
    const { createUser, updateUserData, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.files[0];
        const password = form.password.value;
        console.log(email, photo, password);

        // request for create user 
        createUser(email, password)
            .then(userCredential => {
                const createdUser = userCredential.user;
                console.log("created user ", createdUser);

                // update user data when user created successfully
                // to update user data 
                // 1. upload img to database
                const imageFile = {
                    image: photo
                };
                const api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_SECRET}`;
                axios.post(api, imageFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        if (res.data.success) {
                            const imageUrl = res.data.data.display_url;
                            // 2 when upload img successfully then update user data.
                            updateUserData(name, imageUrl)
                                .then(() => {
                                    console.log("user profle update successfully");
                                    // 3 when profile update successfully 
                                    // logout user 
                                    logOut()
                                        .then(() => {
                                            //4 when logout successfull navigate to login page 
                                            navigate("/login");
                                            console.log("Log out successfully");
                                            Swal.fire({
                                                title: "Login !",
                                                text: "Account created successfully.",
                                                icon: "success"
                                            });

                                        })
                                        .catch(err => {
                                            const errMessage = err.message;
                                            console.error(errMessage);
                                        })

                                })
                                .catch(err => {
                                    const errMessage = err.message;
                                    toast.error(errMessage);
                                    console.error(errMessage);
                                })
                        }
                    })



            })
            .catch(err => {
                const errMessage = err.message;
                console.error(errMessage);
            })


    };
    return (
        <div className="mt-20 w-full max-w-2xl mx-auto border">
            <h3 className="text-4xl font-bold">Please Register</h3>
            <form onSubmit={handleRegister} className="mt-7">
                <div>
                    <label htmlFor="email">Name</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="Name" type="text" name="name" id="name" required />
                </div>
                <div className="mt-8">
                    <label htmlFor="email">Email</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="username@gmail.com" type="email" name="email" id="email" required />
                </div>
                <div className="mt-8">
                    <label htmlFor="photo">Photo</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="Photo" type="file" name="photo" id="photo" required />
                </div>
                <div className="mt-8">
                    <label htmlFor="Password">Password</label>
                    <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="password" type="password" name="password" id="password" required />
                </div>
                <button className="mt-10 py-3 font-bold text-xl bg-[#A93159] text-white w-full rounded-3xl">Register</button>
            </form>
            <p className="mt-11 text-center">or continue with</p>
            <div className="mt-4 text-center">
                <GoogleLogin/>
            </div>
            <p className="mt-8 text-center">Already have an account yet? <Link to="/login" className="font-medium underline decoration-[#A93159]">Login</Link></p>
        </div>
    );
};

export default Register;