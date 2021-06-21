import React, { useState } from "react";
import firebase from "../services/database/config/fire";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
    const [user, setUser] = useState<firebase.User | undefined>(undefined);
    const upUserOn = (user?: firebase.User) => {
        setUser(user)
    }

    return user ? <AppRoutes updateUser={upUserOn}/> : <AuthRoutes updateUser={upUserOn}/>
}

export default Routes