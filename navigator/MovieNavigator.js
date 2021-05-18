import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MovieListScreen from '../screens/MovieListScreen';

const MovieNavigator =  createStackNavigator({
    MovieList: MovieListScreen,

},{
    defaultNavigationOptions:{
        headerTitle:'Movies',
        headerStyle:{
            backgroundColor:'black',
        },
        headerTitleStyle:{fontSize:20,fontWeight:'bold'},
        headerTintColor:'white'
    }
});

export default createAppContainer(MovieNavigator);