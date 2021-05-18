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
        backgroundColor: "#000",
      },
      headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      headerTintColor: "white",
    },
  },
  {
    initialRouteName: "MovieList",
    cardStyle: { backgroundColor: "transparent", opacity: 1 },
    transitionConfig: () => ({
      containerStyle: { backgroundColor: "transparent" },
      transitionSpec: { duration: 0, useNativeDriver: true },
    }),
  }
);

export default createAppContainer(MovieNavigator);
