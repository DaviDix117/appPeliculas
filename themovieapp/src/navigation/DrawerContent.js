import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';

import usePreference from "../hooks/usePreferences";

export default function DrawerContent(props) {
    const {navigation} = props; 
    const [active, setActive] = useState("home");//Determinar en cual pagina se encuentra el usuario
    
    const { theme, toggleTheme} = usePreference();

    const onChangeScreen = (screen) =>{
        setActive(screen);
        navigation.navigate(screen);
    };

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item 
                 label="Inicio"
                 active={active === "home"} //Para determinar la pagina del usuario
                 onPress={() => onChangeScreen("home")}
                />
                <Drawer.Item 
                 label="Películas populares"
                 active={active === "popular"} //Para determinar la pagina del usuario
                 onPress={() => onChangeScreen("popular")}
                />
                <Drawer.Item 
                 label="Nuevas Películas"
                 active={active === "news"} //Para determinar la pagina del usuario
                 onPress={() => onChangeScreen("news")}
                />
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text> Tema oscuro </Text>
                        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})
