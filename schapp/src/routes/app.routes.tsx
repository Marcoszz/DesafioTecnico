import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import CreateScheduling from "../pages/CreateScheduling";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import SchedulingCreated from "../pages/SchedulingCreated";
import firebase from '../services/database/config/fire';


interface Prop {
    updateUser: (user?: firebase.User) => void
}

const App = createStackNavigator();

const AppRoutes = ({ updateUser }: Prop) => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#2D9CDB'},
        }}
    > 

        <App.Screen name="Dashboard" component={Dashboard}/>
        <App.Screen name="Profile">
            {(props) => <Profile {...props} updateUser={updateUser} />}
        </App.Screen>
        <App.Screen name="CreateScheduling" component={CreateScheduling}/>
        <App.Screen name="SchedulingCreated" component={SchedulingCreated}/>
    </App.Navigator>
);

export default AppRoutes