import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";

const MovieNavigator = createStackNavigator(
  {
    MovieList: MovieListScreen,
    MovieDetail: MovieDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Movies",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      headerTintColor: "white",
    },
  },
  {
    initialRouteName: "MovieList",
    cardStyle: { opacity: 1, backgroundColor: "black" },
   
  }
);

export default createAppContainer(MovieNavigator);
