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
    axios.get(`https://api.themoviedb.org/3/configuration?api_key=563bb1cb72253b6be2c32ce80a7a07ef`)
    .then(res => {
      const images = res.data.images;
      // console.log('movies:', images)
      this.setState({ images });
    })
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=563bb1cb72253b6be2c32ce80a7a07ef&language=en-US&page=1`)
    .then(res => {
      const playing = res.data.results;
      // console.log('movies:', playing)
      this.setState({ playing });
      this.sortingMovies(this.state.movies, playing)
      this.changeImagePath(this.state.images, playing)
    })
  }

  sortingMovies(movies, playing) {
    playing.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1 )
    movies.forEach(val_1 => {
      playing.forEach(val_2 => {
        val_2.genre_ids.forEach((genre, index) => {
        if (val_1.id === genre) {
          return val_2.genre_ids[index] = val_1
        }
      })
      })
    })
    this.setState(playing)
  }

  changeImagePath(images, playing) {
    if (Object.entries(images).length !== 0 && images.constructor === Object) {
      playing.forEach(play => {
        let playPoster = play.poster_path
        return play.poster_path = images.base_url + images.poster_sizes[2] + playPoster
      })      
      this.setState(playing)      
    }
  }

  render() {
    return (
      <div>
       <MoviesList 
          movies={this.state.movies}
          playing={this.state.playing}
       ></MoviesList>
      </div>
    );
  }
}

export default App;