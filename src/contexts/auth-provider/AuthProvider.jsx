import PropTypes from 'prop-types'; 

import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/intailize-firebase-authentication";
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(true);

    const createUser = (email, password) => {
        setIsUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserData = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    const emailPassLogin = (email, password) => {
        setIsUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setIsUserLoading(true);
        return signOut(auth);
    };

    const googleLogin = () => {
        setIsUserLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const authInfo = {
        user,
        createUser,
        updateUserData,
        emailPassLogin,
        googleLogin,
        logOut,
        isUserLoading

    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsUserLoading(false);
            console.log("user inside auth", currentUser);
        });

        return () => {
            unSubscribe();
        }
    }, []);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
};
export default AuthProvider;