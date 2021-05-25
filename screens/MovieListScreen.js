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
      oldDataArr: {},
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
    console.log('constructor!');
  }
  async componentDidMount() {
    let pageCount = this.state.page;
    let dataLoading = await this.getData(this.state.page);
    this.setState({
      page: pageCount,
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(dataLoading),
      oldDataArr: dataLoading
    });
    // console.log(dataLoading)
    console.log('conponent did mount!');
  }

  updateItem = async () => {
    let page = this.state.page+1;
    let lastList = this.state.oldDataArr;
    let newData=[];
    let dataLoading = await this.getData(page);
    newData = [...lastList,...dataLoading];
    this.setState({
      page: page,
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(newData),
      oldDataArr:newData,
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
        onViewDetail={() =>{
          this.props.navigation.navigate("MovieDetail", {
            movieTitle: title,
            movieData: data,
          });
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.screen}>
        <RecyclerListView
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
          onScroll={this.updateItem}
        />
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
