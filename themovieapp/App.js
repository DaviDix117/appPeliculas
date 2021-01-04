import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Button, Card } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>HOLAAAAAs</Text>        
        <Button icon="camera" mode="contained" onPress={() => console.log('Presionado')}>
          Press me
        </Button>
        <Card>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button  onPress={() => console.log('OKKKk')} >Ok</Button>
          </Card.Actions>
        </Card>
      </SafeAreaView>
    </PaperProvider>
  )
}
