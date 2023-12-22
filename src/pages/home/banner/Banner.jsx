import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleExplore = () => {
       
            navigate("/dashboard");
            
    };
    return (
        <div className="bg-[url('https://i.ibb.co/Q9jy9m3/concentration-focus-business-goal-target-business-goal-solution-concept-1150-52732.jpg')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.60)] md:h-[600px] flex justify-center items-center bg-blend-overlay p-5">
            <div className="max-w-[600px] mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-white">Empower Your Day with My Tasks</h1>
                <p className="mt-3 text-white">Start your day with purpose! Achieve more with our task management tools. Your success begins here. Unlock your full potential and elevate your productivity with our cutting-edge task management tools.</p>
                <button onClick={handleExplore} className="mt-3 bg-[#A93159] text-white font-medium text-xl px-2 md:px-4 py-1 md:py-2">Let&#39;s Explore</button>
            </div>
        </div>
    );
};

export default Banner;