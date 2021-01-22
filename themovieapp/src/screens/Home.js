import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Title } from "react-native-paper";
import { map } from "lodash"; //Crear mas fácilmente un map

import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from "../api/movie";
import CarouselVertical from "../components/CarouselVertical";
import CarouselMulti from "../components/CarouselMulti";

export default function Home(props) {

    const {navigation } = props;
    const [newMovies, setNewMovies] = useState(null);       //Guarda listado de nuevas películas
    const [genreList, setGenreList] = useState([]);         //Guarda array de géneros
    const [genreSelect, setGenreSelect] = useState(28);     //Guarda el genero seleccionado y predeterminado acción(28)
    const [genreMovies, setGenreMovies ] = useState(null);  //Guardar las películas por genero previamente seleccionado

    //Hook para obtener las nuevas películas
    useEffect(() => {
        getNewsMoviesApi().then((response) =>{
            setNewMovies(response.results);
        });
    }, []);

    //Hook para obtener los géneros de las películas
    useEffect(() => {
        getAllGenresApi().then((response) =>{
            setGenreList(response.genres);
        });
    }, []);

    //Hook para obtener y actualizar las películas por genero seleccionadas (CarouselMulti)
    useEffect(() => {
        getGenreMoviesApi(genreSelect).then((response) =>{
            setGenreMovies(response.results);
        });
    }, [genreSelect]);

    const onChangeGenre = (newGenreId) => {
        setGenreSelect(newGenreId);
    }

    return (

        <ScrollView showsVerticalScrollIndicator={false}>
            {/* //CARRUSEL CON SLIDER */}
            {newMovies &&(
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>nuevas películas</Title>
                    <CarouselVertical data={newMovies} navigation={navigation} />
                </View>
            )}

            {/* //PELÍCULAS POR GENERO */}
            <View style={styles.genres}>
                <Title style={styles.genresTitles}>Películas por genero</Title>
                
                {/* Seleccionar Genero */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {map(genreList, (genre) =>(
                        <Text 
                            key={genre.id} 
                            style={[
                                styles.genre, 
                                {color : genre.id !== genreSelect ? '#8697a5' : '#fff'} 
                            ]}
                            onPress={()=>onChangeGenre(genre.id)}>
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>

                {/* Carousel de películas */}
                {genreMovies &&(
                    <CarouselMulti data={genreMovies} navigation={navigation} />
                )}
            </View>


        </ScrollView>
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
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10,
    },
    genre: {
        marginRight: 20,
        fontSize: 16,
    }
});

