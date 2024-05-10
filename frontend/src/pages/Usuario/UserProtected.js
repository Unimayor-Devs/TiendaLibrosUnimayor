import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/AuthContex";

export function UserProtected({children}){
    const {user} = useContext(Context);

    if(!user){
        return <Navigate to="/" replace/>
    }else{
        return children;
    }
}