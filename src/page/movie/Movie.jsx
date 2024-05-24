import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../css/movie.css';

const Movie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const searchMovies = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredMovies = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTermLowerCase)
    );
    setDisplayedMovies(filteredMovies);
  };

  const toggleFavorite = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.id === movie.id);
    let updatedFavorites = [...storedFavorites];
    if (index === -1) {
      updatedFavorites.push(movie);
    } else {
      updatedFavorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  useEffect(() => {
    const fetchMovies = async (genreId) => {
      setIsLoading(true);
      try {
        const params = {
          api_key: '53f3e1d3fbfed79960a6076096d187b1',
        };
        if (genreId) {
          params.with_genres = genreId;
        }
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params });
        setAllMovies(response.data.results);
        setDisplayedMovies(response.data.results);
        localStorage.setItem('allMovies', JSON.stringify(response.data.results));
        localStorage.setItem('displayedMovies', JSON.stringify(response.data.results));
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const genreId = new URLSearchParams(window.location.search).get('genre');
    fetchMovies(genreId);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, [isLoading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="Movie">
      <h1>Movie</h1>
      <div className="search_container">
        <input
          className="search_movie"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movie..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searchMovies();
            }
          }}
        />
        <button className="btn_search_movie" onClick={searchMovies}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && !selectedMovie && (
        <div className="container_movie">
          {displayedMovies.map((movie) => (
            <div className="info_movie" key={movie.id}>
              <Link to={`/details/movie/${movie.id}`}>
                <img className="img_movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2 className="title_movie">{movie.title}</h2>
              </Link>
              <div className="info_bottom">
                <p className="releaseDate_movie">{formatDate(movie.release_date)}</p>
                <div className="icons">
                  <button
                    className="btn_favorite"
                    onClick={() => toggleFavorite(movie)}
                    title={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(movie.id) ? <FontAwesomeIcon className="icon_check" icon={faCheck} /> : <FontAwesomeIcon className="icon_plus" icon={faPlus} />}
                  </button>
                  <Link to={`/details/movie/${movie.id}`}>
                    <FontAwesomeIcon className="icon_play" icon={faPlay} title="Play" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {displayedMovies.length === 0 && <p>No results found.</p>}
        </div>
      )}
    </div>
  );
};

export default Movie;
