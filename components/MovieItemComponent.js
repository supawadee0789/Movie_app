import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BodyText from "./BodyText";
const MovieItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onViewDetail}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://www.themoviedb.org/t/p/original" + props.img,
          }}
        />
        <View style={styles.text}>
          <Text style={styles.title}>{props.title}</Text>
          <BodyText>{"(" + props.releaseDate.split("-")[0] + ")"}</BodyText>
          <BodyText style={styles.rate}>
            <AntDesign name="star" size={14} color="#FDCE2A" />{" "}
            {props.voteAverage}
          </BodyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  text: {
    marginVertical: 25,
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  rate: {
    marginVertical: 5,
  },
});
export default MovieItem;
