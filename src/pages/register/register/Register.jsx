import { Link } from "react-router-dom";
import googleImg from "../../../assets/google.png"

const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const photo = form.photo.files[0];
        
        const password = form.password.value;
        console.log(email,photo, password);
    };
    return (
        <div className="mt-20 w-full max-w-2xl mx-auto border">
        <h3 className="text-4xl font-bold">Please Register</h3>
        <form onSubmit={handleRegister} className="mt-7">
            <div>
                <label htmlFor="email">Email</label>
                <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="username@gmail.com" type="email" name="email" id="email" required/>
            </div>
            <div className="mt-8">
                <label htmlFor="photo">Photo</label>
                <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="Photo" type="file" name="photo" id="photo" required/>
            </div>
            <div className="mt-8">
                <label htmlFor="Password">Password</label>
                <input className="mt-2 py-4 px-5 w-full border-[#BCBEC0] border rounded-3xl" placeholder="password" type="password" name="password" id="password" required/>
            </div>
            <button className="mt-10 py-3 font-bold text-xl bg-[#A93159] text-white w-full rounded-3xl">Register</button>
        </form>
        <p className="mt-11 text-center">or continue with</p>
        <div className="mt-4 text-center">
            <button className="border px-12 py-3 border-[#BCBEC0] rounded-3xl">
                <img src={googleImg} alt="" />
            </button>
        </div>
        <p className="mt-8 text-center">Already have an account yet? <Link to="/login" className="font-medium">Login</Link></p>
    </div>
    );
};

export default Register;