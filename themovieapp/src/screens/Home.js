import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getNewsMoviesApi } from "../api/movie";

export default function Home() {
    const [newMovies, setNewMovies] = useState(null);

    useEffect(() => {
        getNewsMoviesApi().then((response) =>{
            setNewMovies(response.results);
        });
    }, []);
    console.log(newMovies);

    return (
        <View>
            <Text>Estamos en Inicio</Text>
        </View>
    )
}
