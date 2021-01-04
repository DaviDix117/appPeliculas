import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import SatckNavigation from "./stackNavigation"


const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <Drawer.Navigator initialRouteName="app">
            <Drawer.Screen name="app" component={SatckNavigation} />
        </Drawer.Navigator>
    )
}
