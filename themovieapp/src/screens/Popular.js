import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import {map} from 'lodash';
import {Rating} from 'react-native-ratings';

import usePreferences from '../hooks/usePreferences';
import { getPopularMoviesApi } from "../api/movie";
import {BASE_PATH_IMG} from '../utils/constants';
import noImage from '../assets/jpg/default-imgage.png';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';


export default function Popular(props) {
    const {navigation} = props;
    const {theme} = usePreferences();
    const [movies, setMovies] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);//Determinar si pintar o no el botón(si ya no quedan mas paginas para cargar)
    const [page, setPage] = useState(1);                 //Funcional botón cargar mas(1:Cargar 1 pagina)

    useEffect(() => {
        getPopularMoviesApi(page).then(response =>{
            const totalPages = response.total_pages;
            if(page < totalPages){
                if(!movies){
                    setMovies(response.results);
                } else {
                    setMovies([...movies, ...response.results]); ///...Obtiene el valor actual del array
                }
            }else{
                setShowBtnMore(false);
            }

        })

    }, [page])//cuando el numero de la pagina se actualiza se vuelva  ejecutar

    return (
        <ScrollView>
            {map(movies, (movie, index)=> (
                <Movie key={index} movie={movie} theme={theme} navigation={navigation} />
            ))}
            {showBtnMore && (
                <Button
                    mode='contained'
                    contentStyle={styles.loadMoreContained}
                    style={styles.loadMore}
                    labelStyle={{ color: theme === "dark" ? '#fff' : '#000' }}
                    onPress={() => setPage(page + 1) } >
                    Cargar mas...
                </Button>
            )}
        </ScrollView>
    );
}

function Movie(props) {
    const {movie, theme, navigation} = props;
    const {id, poster_path, title, release_date, vote_count, vote_average} = movie;

    const goMovie = () =>{
        navigation.navigate("movie", {id} )
    }

    return(
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style={styles.movie}>
                <View style={styles.left}>
                    <Image
                        style={styles.image}
                        source={
                            poster_path
                                ? { uri: `${BASE_PATH_IMG}/w500${poster_path}` }
                                : noImage
                        }
                    />
                </View>

                <View>
                    <Title style={{marginRight: 95}}>{title}</Title>
                    <Text>{release_date}</Text>
                    <MovieRating voteAverage={movie.vote_average} voteCount={movie.vote_count} theme={theme}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

function MovieRating(props) {
    
    const {theme, voteCount, voteAverage} = props;
    

    if(voteAverage === undefined ) return null;

    const media = voteAverage / 2;

    return(
        <View style={styles.viewRating}>
            <Rating 
                readonly={true}
                type='custom'
                ratingImage={theme === "dark" ? starDark : starLight}
                ratingColor='#ffc205'
                ratingBackgroundColor= {theme === "dark" ? '#192734' : '#f0f0f0'}
                startingValue={media}
                imageSize={20}
                style={{marginRight: 15}}
            />
            <Text style={{fontSize: 12, color: '#8697a5'}} >
                {voteCount} votos
            </Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    movie: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        marginRight: 18,
    },
    image: {
        width: 100,
        height: 150,
    },
    viewRating: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    loadMoreContained: {
        paddingTop: 10,
        paddingBottom: 10
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})