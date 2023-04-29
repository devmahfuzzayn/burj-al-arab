import React, { useState } from "react";
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import firebaseApp from "../../firebase/firebase.config";
import { createContext } from "react";
import { useEffect } from "react";

const auth = getAuth(firebaseApp);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    // States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Firebase Providers
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const githubAuthProvider = new GithubAuthProvider();

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const resetUserPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    };

    const githubLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubAuthProvider);
    };

    const authInfo = {
        user,
        loading,
        registerUser,
        logInUser,
        logOutUser,
        resetUserPassword,
        googleLogIn,
        githubLogIn,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
