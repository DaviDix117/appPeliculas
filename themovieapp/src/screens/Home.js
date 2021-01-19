import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Title } from "react-native-paper";

import { getNewsMoviesApi, getAllGenresApi } from "../api/movie";
import CarouselVertical from "../components/CarouselVertical";

export default function Home(props) {
    const {navigation } = props;
    const [newMovies, setNewMovies] = useState(null);
    const [genreMovies, setGenreMovies] = useState(null);

    useEffect(() => {
        getNewsMoviesApi().then((response) =>{
            setNewMovies(response.results);
        });
    }, []);

    useEffect(() => {
        getAllGenresApi().then((response) =>{
            setGenreMovies(response.results);
        });
    }, [])

    return (
        <>
            {/* //CARRUSEL CON SLIDER */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {newMovies &&(
                    <View style={styles.news}>
                        <Title style={styles.newsTitle}>nuevas películas</Title>
                        <CarouselVertical data={newMovies} navigation={navigation} />
                    </View>
                )}
            </ScrollView>

            {/* //PELÍCULAS POR GENERO */}
            <View style={styles.genres}>
                    <Title style={styles.genresTitles}>Películas por genero</Title>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10,

    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },
    genres: {
        marginTop: 20,
        marginBottom: 50,
    },
    genresTitles: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    }
});

