import React from 'react';
import {Text,View ,Image,TouchableNativeFeedback,StyleSheet} from 'react-native';
import BodyText from './BodyText';
const MovieItem = props =>{
    return(
        <TouchableNativeFeedback onPress={props.onViewDetail}>
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://www.themoviedb.org/t/p/original'+props.img}}/>
            <View style={styles.context}>
                <Text style={styles.title}>{props.title}</Text>
                <BodyText>{"("+props.releaseDate.split('-')[0]+")"}</BodyText>
                <BodyText>{props.voteAverage}</BodyText>
            </View>
        </View></TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding: 15,
    },
    image:{
        width: 100,
        height:150,
        borderRadius:10
    },
    context:{
        marginVertical:25,
        marginHorizontal:20,
        flex:1
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
        textAlign:'left',
        
    }
});
export default MovieItem;
