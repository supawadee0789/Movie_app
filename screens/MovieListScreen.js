import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import MovieItem from "../components/MovieItemComponent";

const screen_width = Dimensions.get("window").width;
class MovieListScreen extends React.Component {
  getTotalPage = async () => {
    let res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=1"
    );
    let json = await res.json();
    console.log(json.total_pages);
    return json.total_pages;
  };

  getData = async (current) => {
    let res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=" +
        current.toString()
    );
    let json = await res.json();
    // console.log(json.results)
    return json.results;
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      list: new DataProvider((r1, r2) => r1 !== r2),
      oldDataArr: [],
    };
    this.getTotalPage;
    this.layoutProvider = new LayoutProvider(
      () => {
        return "NORMAL";
      },
      (type, dim) => {
        switch (type) {
          case "NORMAL":
            dim.width = screen_width;
            dim.height = 200;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      }
    );
    console.log('constructor!')
  }
  async componentDidMount() {
    let pageCount = this.state.page;
    let dataLoading = await this.getData(this.state.page);
    this.setState({
      page: pageCount + 1,
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(dataLoading),
      oldDataArr: dataLoading,
    });
    console.log('conponent did mount!')
  }

  updateItem = async () => {
    let page = this.state.page;
    let lastList = this.state.oldDataArr;
    let dataLoading = await this.getData(page);
    let newData = Object.assign(lastList,dataLoading);
    this.setState({
      page: page + 1,
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(newData),
      oldDataArr: newData,
    });
  };
  rowRenderer = (type, data) => {
    const { title, poster_path, release_date, vote_average } = data;
    return (
      <MovieItem
        title={title}
        img={poster_path}
        releaseDate={release_date}
        voteAverage={vote_average}
        // onViewDetail={() => {
        //   props.navigation.navigate("MovieDetail", {
        //     movieTitle: title,
        //     movieData: data,
        //   });
        // }}
      />
    );
  };
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=2"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json.results))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);
  render() {
    return (
      <View style={styles.screen}>
        <RecyclerListView
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
          onEndReached={this.updateItem}
          disableRecycling={false}
        />
        {/* {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem
              title={item.title}
              img={item.poster_path}
              releaseDate={item.release_date}
              voteAverage={item.vote_average}
              onViewDetail={() => {
                props.navigation.navigate("MovieDetail", {
                  movieTitle: item.title,
                  movieData: item
                });
              }}
            />
          )}
        />
      )} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "black",
    flex: 1,
    padding: 20,
  },
});

export default MovieListScreen;
