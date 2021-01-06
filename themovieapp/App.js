import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  )
}
 