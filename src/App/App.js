import React, {Component} from 'react';
import Header from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';
import MovieDetails from '../MovieDetails/MovieDetails';
import movieData from '../data.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: movieData.movies,
      movie: {}
    }
  }

  getSingleMovie = (movieId) => {
    const clickedMovie = {"movie": {id: 1, title: "Fake Movie Title", poster_path: "https://image.tmdb.org/t/p/original//7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg", backdrop_path: "https://image.tmdb.org/t/p/original//oazPqs1z78LcIOFslbKtJLGlueo.jpg", release_date: "2019-12-04", overview: "Some overview that is full of buzzwords to attempt to entice you to watch this movie! Explosions! Drama! True love! Robots! A cute dog!", average_rating: 6, genres: [{id: 18, name:"Drama"}], budget:63000000, revenue:100853753, runtime:139, tagline: "It's a movie!" }}

    this.setState({movie: clickedMovie})
  }


  render() {
    return (
      <main className="App">
        <Header />
        {Object.keys(this.state.movie).length === 0 && <MovieContainer movies={this.state.movies} getSingleMovie={this.getSingleMovie}/>}
        {Object.keys(this.state.movie).length > 0 && <MovieDetails />}
      </main>
    );
  }
}

export default App;
