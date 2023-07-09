import { Navigate } from "react-router";

export const PrivateRoutes = ({children}) =>  {
    const getTokenFromLocalStorage = localStorage.getItem('token');
    console.log(getTokenFromLocalStorage)
    return children;
}