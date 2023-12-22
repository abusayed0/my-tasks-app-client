import { Outlet } from "react-router-dom";
import Footer from "../../shared-components/footer/footer/Footer";
import Navbar from "../../shared-components/navbar/navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;