import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { map } from "lodash";
import { ScrollView } from 'react-native-gesture-handler';

import {getNewsMoviesApi} from '../api/movie';
import { BASE_PATH_IMG } from "../utils/constants";
import usePreferences from "../hooks/usePreferences";


const {width} = Dimensions.get("window");

export default function News(props) {
    const { navigation } = props;
    const {theme} = usePreferences();

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [showBtnMore, setShowBtnMore] = useState(true);

    useEffect(() => {
        getNewsMoviesApi(page).then((response) => {
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
        });
    }, [page]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {map(movies, (movie, index) =>(
                    <Movie key={index} movie={movie} navigation={navigation} />
                ))}
            </View>
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
    const { movie, navigation } = props;
    const { id, title, poster_path } = movie;

    const goMovie = () =>{
        navigation.navigate("movie", {id} )
    }

    return(
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style={styles.movie}>
                {poster_path ? (
                    <Image 
                        style={styles.img}
                        source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
                    />
                ) : (
                    <Text>{title}</Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    movie: {
        width: width / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%'
    },
    loadMoreContained: {
        paddingTop: 10,
        paddingBottom: 10
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})

