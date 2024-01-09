import React, { useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import { Outlet } from 'react-router-dom'
import { Login } from './Login';
export const ProtectRoute = () => {
    const AuthCtx = useContext(AuthContext);
  return (
    AuthCtx.isLoggedIn ? <Outlet/> : <Login/>
  )
}