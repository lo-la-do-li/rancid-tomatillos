import React, {Component} from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import Header from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';
import MovieDetails from '../MovieDetails/MovieDetails';
import ReactPlayer from 'react-player';
import './App.css';
import { fetchSingleMovie, fetchMovies, fetchTrailer } from '../apiCalls';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
      movie: null,
			error: '',
			statusCode: 0,
			isMovieDetails: false,
			movieTrailer: null
		}
	}

  componentDidMount = () => {
		fetchMovies()
		.then(data => {
			if(typeof data === 'object') {
				this.setState({ movies: data.movies })
			} else {
				this.setState({ statusCode: data })
			}
		})
		.catch(error => this.setState({ error: error.message }))
	}
	
	getSingleMovie = (id) => {
		this.setState({ isMovieDetails: true })
    fetchSingleMovie(id)
    .then(data => {
			if(typeof data === 'object') {
				this.setState({ movie: data.movie })
			} else {
				this.setState({ statusCode: data })
			}
		})
		.catch(error => this.setState({ error: error.message }))

		this.getMovieTrailer(id);
	}

	getMovieTrailer(id) {
		fetchTrailer(id)
		.then(data => this.setState({ movieTrailer: data.videos }))
		.catch(error => console.log(error))
	}

	goHome = () => {
		this.setState({ isMovieDetails: false, movie: null, statusCode: 0})
	}

	render() {
		return (
			<main className="App">
				<header>
					<h1>Rancid Tomatillos</h1>
			
					<nav>
						{this.state.isMovieDetails && <button onClick={() => {this.goHome()}}>Back</button>}
					</nav>
				</header>
				{/* {this.state.movie === null ?  */}
					<Route 
						exact 
						path='/' 
						render={() => {
							return (
							<MovieContainer 
								movies={this.state.movies} 
								getSingleMovie={this.getSingleMovie} 
								statusCode={this.state.statusCode}  
								error={this.state.error} 
							/>
							)
						}}
					/> 
					<Route 
						exact
						path='/:id'
						render={() => {
							if (!this.state.movie) {
								return(
									<h1>Whoops, it looks like something went wrong!</h1>
								)
							}
							return (	
								<MovieDetails 
								movie={this.state.movie}
								statusCode={this.state.statusCode}  
								error={this.state.error} 
								movieTrailer={this.state.movieTrailer[0]}
								/>
							)
						}}
					/>
				
			</main>
		);
	}
}

export default App;
