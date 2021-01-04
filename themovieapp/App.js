import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Button, Card } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>HOLAAAAA</Text>
        <Button mode="contained" onPress={() => console.log('Presionado')}>
          Press me
        </Button>
        <Card>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </SafeAreaView>
    </PaperProvider>
  )
}
