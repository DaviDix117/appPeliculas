import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { Searchbar, Text, Title } from "react-native-paper";
import {size, map} from 'lodash'

import { searchMoviesApi } from "../api/movie";
import { BASE_PATH_IMG } from "../utils/constants";

const {width} = Dimensions.get("window");

export default function Search(props) {
    const {navigation} = props;

    const [movies, setMovies] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (size(search) > 2){
            searchMoviesApi(search).then((response)=>{
                setMovies(response.results);
            });
        }
    }, [search]);
    
    return (
        <View>
            <Searchbar 
                placeholder="Busca tu película"
                iconColor={ Platform.OS === "ios" && ('transparent') }
                icon="arrow-left"
                style={styles.input}
                onChangeText={(e)=> setSearch(e)}
            />
            <ScrollView>
                <View style={styles.contained}>
                {map(movies, (movie, index)=> (
                    <Movie key={index} movie={movie} navigation={navigation} />
                ))}
                </View>
            </ScrollView>
        </View>
    )
}

function Movie(props) {
    const {movie, navigation} = props;
    const {id, poster_path, title} = movie;

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
    input: {
        marginTop: -3,
        backgroundColor: '#15212b'
    },
    contained: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
});

