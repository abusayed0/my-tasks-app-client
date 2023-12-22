import { useEffect, useState } from "react";
import {
    Navbar as Navigation,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const navList = <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <NavLink to="/" className="flex items-center hover:text-blue-500 transition-colors">
        Home
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <NavLink to="/dashboard" className="flex items-center hover:text-blue-500 transition-colors">
        Dashboard
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <NavLink to="/login" className="flex items-center hover:text-blue-500 transition-colors">
        Login
      </NavLink>
    </Typography>
    
  </ul>
    return (
        <Navigation className="sticky top-0 z-10 h-max max-w-full rounded-none px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    My Tasks
                </Typography>
                <div className="hidden lg:block">
                    {navList}
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                {navList}
            </Collapse>
        </Navigation>
    );
};

export default Navbar;