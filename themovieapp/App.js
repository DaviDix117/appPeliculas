import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Button, Card } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView>
          <Text>HOLAAAAAs</Text>        
          <Button icon="camera" mode="contained" onPress={() => console.log('Presionado')}>
            Press me
          </Button>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  )
}
