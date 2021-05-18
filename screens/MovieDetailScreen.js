import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
const MovieDetailScreen = (props) => {
  const movieData = props.navigation.getParam("movieData");
  return (
    <View style={styles.screen}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://www.themoviedb.org/t/p/original" + movieData.backdrop_path,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{movieData.title}</Text>
        <BodyText>
          {"(" + movieData.release_date.split("-")[0] + ")"}{" "}
          <AntDesign name="star" size={14} color="#FDCE2A" />{" "}
          {movieData.vote_average}
        </BodyText>
        <BodyText style={styles.overview}>{movieData.overview}</BodyText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "black",
    flex: 1,
    alignItems:'center'
  },
  image: {
    width: "90%",
    height: "25%",
    marginVertical: 15,
  },
  container: {
    alignItems: "center",
    marginHorizontal: 30,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:'center'
  },
  overview: {
    marginVertical: 15,
    textAlign: "justify",
  },
});
MovieDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("movieTitle"),
  };
};
export default MovieDetailScreen;
