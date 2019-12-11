import React, { Component } from 'react';
import axios from 'axios';
import MoviesList from './MoviesList';

class App extends Component {
  state = {
    movies: [],
    playing: [],
    images: {}
  }

  componentDidMount() {
    this.getMoviesAPI()
  }

  getMoviesAPI () {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=563bb1cb72253b6be2c32ce80a7a07ef&language=en-US`)
    .then(res => {
      const movies = res.data.genres;
      // console.log('movies:', movies)
      this.setState({ movies });
    })
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=563bb1cb72253b6be2c32ce80a7a07ef&language=en-US&page=1`)
    .then(res => {
      const playing = res.data.results;
      // console.log('movies:', playing)
      this.setState({ playing });
    })
    axios.get(`https://api.themoviedb.org/3/configuration?api_key=563bb1cb72253b6be2c32ce80a7a07ef`)
    .then(res => {
      const images = res.data.images;
      // console.log('movies:', images)
      this.setState({ images });
    })
  }

  render() {
    return (
      <div>
       <MoviesList 
          movies={this.state.movies}
          images={this.state.images}
          playing={this.state.playing}
       ></MoviesList>
      </div>
    );
  }
}

export default App;