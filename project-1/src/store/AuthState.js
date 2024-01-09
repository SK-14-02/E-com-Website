import React, { useState } from 'react'
import AuthContext from './AuthContext';
export const AuthState = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {props.children}
    </AuthContext.Provider>
  )
}