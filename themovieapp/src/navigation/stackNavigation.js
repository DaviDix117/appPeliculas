import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home"
import Movie from "../screens/Movie"
import News from "../screens/News"
import Popular from "../screens/Popular"
import Search from "../screens/Search"

const Stack = createStackNavigator();

export default function stackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
             name='home' 
             component={Home} 
             options={{title: "The Movie App"}} />

            <Stack.Screen name='movie' component={Movie} options={{title:"Peliculas"}} />
            <Stack.Screen name='news' component={News} options={{title:"Nuevas"}} />
            <Stack.Screen name='popular' component={Popular} options={{title:"Populares"}} />
            <Stack.Screen name='search' component={Search} options={{title:""}} />
        </Stack.Navigator>
    );
}
