import React, { Component } from 'react';
import {ChipSet, Chip} from '@material/react-chips';
import '@material/react-chips/dist/chips.css';
import PropTypes from 'prop-types';

class MoviesList extends Component {
  constructor(props, context) {
    super(props, context);

    this.changeRank = this.changeRank.bind(this);
    this.changeGenreSize = this.changeGenreSize.bind(this);

    this.state = {
      query: [],
      rank: 3,
      genreSize: false
    }
  }

  static propTypes = {
    movies: PropTypes.array.isRequired,
    playing: PropTypes.array.isRequired,
  }


  changeRank = (e) => {
    this.setState({rank: e.target.value});
  }

  changeGenreSize() {
    const currentGenreSize = this.state.genreSize;
    this.setState({ genreSize: !currentGenreSize });
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
        <div>
          <ChipSet
            filter
            className={this.state.genreSize ? 'movie-list__chips movie-list__chips--more': 'movie-list__chips'} 
            handleSelect={(moviesId) => this.setState({query: moviesId})}
          >
            {movies.map((movie, index) => (
              <Chip key={ index } id={ movie.id } label={ movie.name } />          
            ))}
          </ChipSet>
          <button type='button' className='movie-list__button-more' onClick={this.changeGenreSize}>more genres</button>
        </div>
        <div className='movie-list__range'>
          <input type='range' min='0' max='10' step='0.5'
            value={this.state.rank} onChange={this.changeRank} />
          <span className='movie-list__range__rank'>
            {this.state.rank}          
          </span>
        </div>

        <div className='movie-list__content'>
          {moviesList.map((play, index) => (
            <div key={ index } className='movie-list__content__detail'>
              <h3>{ play.original_title }</h3>
              <div className='movie-list__content__genre'>
                {play.genre_ids.map((genre, index) => (
                  <span key={ index } id={ genre.id }>{ genre.name } / </span>
                ))}                
              </div>
              <img src={ play.poster_path } alt={ play.original_title } />
            </div>          
          ))}
        </div>
      </div>
    );
  }
}

export default MoviesList;
