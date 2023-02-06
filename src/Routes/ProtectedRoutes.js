import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthDataContext } from '../AuthContext/AuthContext';
import MediumSpinner from '../components/Spinner/MediumSpinner';

const ProtectedRoutes = ({children}) => {
    const {user, loading} = useContext(AuthDataContext);
    const location = useLocation()
      if(loading){
        return <MediumSpinner></MediumSpinner>
      }
   
            if(user){
                return children;
            }
            return <Navigate to='/' state={{from:location}} replace></Navigate>
};

export default ProtectedRoutes;