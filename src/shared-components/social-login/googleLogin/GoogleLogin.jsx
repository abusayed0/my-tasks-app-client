import { useContext } from "react";
import googleImg from "../../../assets/google.png"
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const {googleLogin} = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from || "/";
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const loggedUser = result.user;
            toast.success("Login successfully !");
            navigate(from, {replace: true});
            console.log("logged user", loggedUser);
        })
        .catch(err => {
            const errMessage = err.Message;
            toast.error(errMessage);
            console.error(errMessage);
        })
    };
    return (
        <button onClick={handleGoogleLogin} className="border px-12 py-3 border-[#BCBEC0] rounded-3xl">
            <img src={googleImg} alt="" />
        </button>
    );
};

export default GoogleLogin;