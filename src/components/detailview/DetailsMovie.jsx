import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/detailView.css';

const DetailsMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [otherMovies, setOtherMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOtherMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1',
            page: 1,
          },
        });
        setOtherMovies(response.data.results.slice(0, 7));
      } catch (error) {
        console.error('Error fetching other movies:', error);
      }
    };

    fetchMovieDetails();
    fetchOtherMovies();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavoriteMovie = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex((fav) => fav.id === movie.id);
    let updatedFavorites = [...storedFavorites];
    if (index === -1) {
      updatedFavorites.push(movie);
    } else {
      updatedFavorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const isFavoriteMovie = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!movie) {
    return <p>Error al obtener detalles de la película. Por favor, inténtalo de nuevo más tarde.</p>;
  }

  return (
    <div className="detailPage">
      <div className="detailView">
        <img className="img_poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="info_detailView">
          <h2 className="title">{movie.title}</h2>
          <div className="info_top">
            <p className="rating_detailView">{formatRating(movie.vote_average)} ⭐️</p>
            <p className="releaseDate_detailView">{formatDate(movie.release_date)}</p>
          </div>
          <p className="description_detailView">{movie.overview}</p>
          <div className='container_addList'>
            <button
              className="btn_favorite"
              onClick={() => toggleFavoriteMovie(movie)}
              title={isFavoriteMovie(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavoriteMovie(movie.id) ? (
                <FontAwesomeIcon className="icon_check" icon={faCheck} />
              ) : (
                <FontAwesomeIcon className="icon_plus" icon={faPlus} />
              )}
            </button>
            <h1>Add to my list </h1>
          </div>
        </div>
      </div>
      <div className="container_other">
        <h1 className="text_Others">Others</h1>
        <div className="otherMovies">
          {otherMovies.map((otherMovie) => (
            <div className="movieCard" key={otherMovie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${otherMovie.poster_path}`} alt={otherMovie.title} />
              <h3>{otherMovie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsMovie;
