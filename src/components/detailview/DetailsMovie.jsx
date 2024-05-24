import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/detailView.css'

const DetailsMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [otherMovies, setOtherMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchOtherMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1',
            page: 1
          }
        });
        setOtherMovies(response.data.results.slice(0, 7));
      } catch (error) {
        console.error('Error fetching other movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    fetchOtherMovies();
  }, [id]);

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
