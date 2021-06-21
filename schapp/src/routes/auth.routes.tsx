import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Login from '../pages/Login';
import Register from '../pages/Register';
import firebase from '../services/database/config/fire'

interface Prop {
    updateUser: (user?: firebase.User) => void
}

const Auth = createStackNavigator();

const AuthRoutes = ({ updateUser }: Prop) => (
    <Auth.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#2D9CDB' },
        }}
    >
        <Auth.Screen name="Login" >
            {(props) => <Login {...props} updateUser={updateUser} />}
        </Auth.Screen>
        <Auth.Screen name="Register" component={Register} />

    </Auth.Navigator>
);

export default AuthRoutes