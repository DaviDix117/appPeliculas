import React, {useState, useEffect} from 'react';
import { Text, Title } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { StyleSheet, Image, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { map, size } from "lodash";

import {BASE_PATH_IMG} from "../utils/constants";
import {getGenreMovieApi} from "../api/movie";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
    const {data} = props;

    return (
        <Carousel 
            layout={"default"}
            data={data}
            renderItem={(item)=> <RenderItem data={item} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH} 
        />
    )
}

//Funcion itinera las peliculas
function RenderItem(props){
    const { data } = props;
    const { title, poster_path, genre_ids } = data.item;
    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

    const [genres, setGenres] = useState(null);

    useEffect(() => {
        getGenreMovieApi(genre_ids).then((response) => {
          setGenres(response);
        });
      }, []);

    return(
        <TouchableWithoutFeedback onPress={()=> console.log("HOLA")} >
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genres}>
                {genres &&
                    map(genres, (genre, index) => (
                    <Text key={index} style={styles.genre}>
                        {genre}
                        {index !== size(genres) - 1 && ', '}
                    </Text>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        textShadowRadius: 10,
    },
    image:{
        width: '100%',
        height: 450,
        borderRadius: 20,  
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    },
    genres: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    genre: {
        fontSize: 12,
        color: '#8997a5'
    }
})
