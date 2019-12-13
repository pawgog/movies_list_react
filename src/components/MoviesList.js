import React, { Component } from 'react';
import {ChipSet, Chip} from '@material/react-chips';
import '@material/react-chips/dist/chips.css';
import PropTypes from 'prop-types';

class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    playing: PropTypes.array.isRequired,
  }

  state = {
    query: []
  }

  filterMovies(filter, moviesList) {
    let filterMoviesList = []
    if (filter !== []) {
      moviesList.forEach(movie => {
        movie.genre_ids.forEach((genre, index) => {
          filter.forEach(chip => {
            if (genre.id === chip) {
              filterMoviesList.push(movie)
            }
          })
        })
      })
      return [...new Set(filterMoviesList)]
    } else {
      this.setState({query: filter})
      return moviesList
    }
  }

  render() {
    const { query } = this.state
    const { movies, playing } = this.props
    const moviesList = query.length === 0
    ? playing
    : this.filterMovies(this.state.query, playing);

    return (
      <div>
        <ChipSet
          filter
          handleSelect={(moviesId) => this.setState({query: moviesId})}
        >
          {movies.map((movie, index) => (
            <Chip key={ index } id={ movie.id } label={ movie.name } />          
          ))}
        </ChipSet>
        <div>
          {moviesList.map((play, index) => (
            <div key={ index }>
              <h4>{ play.original_title }</h4>
                {play.genre_ids.map((genre, index) => (
                  <span key={ index } id={ genre.id }>{ genre.name } / </span>
                ))}
              <img src={ play.poster_path } alt={ play.original_title } />
            </div>          
          ))}
        </div>
      </div>
    );
  }
}

export default MoviesList;
