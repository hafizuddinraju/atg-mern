import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';
// create context
export const AuthDataContext = createContext();
const auth = getAuth(app)
const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [sign, setSign] = useState({});
    const [loading, setLoading] = useState(true);
// userLogin function
    const UserLogin = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
//userSignup function
    const CreateSignUp = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //logout function
    const LogOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    //user profile update function
    const profileUpdate = (profile)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }
    // google login function
    const googleLogin = (Provider)=>{
        setLoading(true)
        return signInWithPopup(auth, Provider)
    }
    const handleForgetPassword =(userEmail) =>{
        setLoading(true)
        return sendPasswordResetEmail(auth, userEmail)

    }
    

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('current user', currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            unSubscribe();
        }
    },[sign])
    const info = {UserLogin, user,CreateSignUp,LogOut,profileUpdate,googleLogin,setSign, loading, handleForgetPassword}
    return (
        <AuthDataContext.Provider value={info}>
           {children} 
        </AuthDataContext.Provider>
    );
};

export default AuthContext;