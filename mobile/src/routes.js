import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


const AppStack=createStackNavigator();

import Incidents  from './pages/incidents'
import Datail  from './pages/detail'

export default function Routes(){
    return (
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Datail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}