import { Outlet } from "react-router-dom";
import Footer from "../../shared-components/footer/footer/Footer";
import Navbar from "../../shared-components/navbar/navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-[1320px] mx-auto px-2 md:px-6">

                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;