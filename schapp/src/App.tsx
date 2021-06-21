import 'react-native-gesture-handler';
import { DEFAULT_EXTENSIONS } from "@babel/core";
import React from "react";
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

const App: React.FC = () => (
    <NavigationContainer>
        <StatusBar 
        barStyle="light-content" 
        backgroundColor="#56CCF2">
        </StatusBar>
        
        <View style={{ backgroundColor: '#2D9CDB', flex: 1}}>
            <Routes/>
        </View>
    </NavigationContainer>   
);

export default App;