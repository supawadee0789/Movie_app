import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet ,ActivityIndicator} from "react-native";

import MovieItem from '../components/MovieItemComponent'

const MovieListScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=1')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.screen}>
    {isLoading?<ActivityIndicator/>:
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={
          ({ item }) => <MovieItem title={item.title} img={item.backdrop_path} releaseDate={item.release_date} voteAverage={item.vote_average}/>
            
        }
      />}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "black",
    flex: 1,
    padding:20
  },
});

export default MovieListScreen;
