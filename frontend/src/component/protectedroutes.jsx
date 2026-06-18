import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';


const ProtectedRoute = ({ children, }) => {
  const { isAuth ,user, loading } = useAuth();

  
  //console.log(user);
  console.log(isAuth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

    if (!isAuth) {
    return <Navigate to="/" />;
  }


  // for authoratision , if user.role!=admin
  // if(user.role!=="admin"){
  //   return <Navigate to="/unauthorized" />
  // }


  return children;
};

export default ProtectedRoute;