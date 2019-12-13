import React, { Component } from 'react';
import {ChipSet, Chip} from '@material/react-chips';
import '@material/react-chips/dist/chips.css';
import PropTypes from 'prop-types';

class MoviesList extends Component {
  constructor(props, context) {
    super(props, context);

    this.changeRank = this.changeRank.bind(this);

    this.state = {
      query: [],
      rank: 3
    }
  }

  static propTypes = {
    movies: PropTypes.array.isRequired,
    playing: PropTypes.array.isRequired,
  }


  changeRank = (e) => {
    this.setState({rank: e.target.value});
  }

  filterMoviesRank(playing) {
    let rankMoviesList = []
    playing.forEach(movie => {
      if (movie.vote_average > this.state.rank) {
        rankMoviesList.push(movie)
      }
    })
    return rankMoviesList
  }

  filterMoviesGenre(filter, moviesList) {
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
      filterMoviesList = this.filterMoviesRank(filterMoviesList);
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
    ? this.filterMoviesRank(playing)
    : this.filterMoviesGenre(this.state.query, playing);

    return (
      <div className='movie-list'>
        <ChipSet
          filter
          handleSelect={(moviesId) => this.setState({query: moviesId})}
        >
          {movies.map((movie, index) => (
            <Chip key={ index } id={ movie.id } label={ movie.name } />          
          ))}
        </ChipSet>
        <div className='movie-list__range'>
          <input type='range' min='0' max='10' step='0.5' className='slider' id='myRange'
            value={this.state.rank} onChange={this.changeRank} />
        </div>
        {this.state.rank}
        <div className='movie-list__content'>
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
