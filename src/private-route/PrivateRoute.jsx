import { useContext } from "react";
import { AuthContext } from "../contexts/auth-provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'; 

const PrivateRoute = ({children}) => {
    const {isUserLoading, user} = useContext(AuthContext);
    const location = useLocation();
    if(isUserLoading){
        return <p>Loading</p>
    }
    if(!user) {
        return <Navigate to="/login" state={{from: location.pathname}} replace={true}/>
    }
    return children;
};
PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired
};
export default PrivateRoute;