import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    playing: PropTypes.array.isRequired,
    images: PropTypes.object.isRequired,
  }

  render() {
    const { movies, images, playing } = this.props

    return (
      <div>
       <p>Test</p>
      </div>
    );
  }
}

export default MoviesList;
