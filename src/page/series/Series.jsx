import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/series.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Series = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allSeries, setAllSeries] = useState([]);
  const [displayedSeries, setDisplayedSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleFavorite = (series) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex((fav) => fav.id === series.id);
    const updatedFavorites = [...storedFavorites];
    if (index === -1) {
      updatedFavorites.push(series);
    } else {
      updatedFavorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favorites')) {
      setFavorites(JSON.parse(localStorage.getItem('favorites')));
    }
  }, []);

  const isFavorite = (seriesId) => {
    return favorites.some((fav) => fav.id === seriesId);
  };

  useEffect(() => {
    const fetchAllSeries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1',
          },
        });
        setAllSeries(response.data.results);
        setDisplayedSeries(response.data.results);
      } catch (error) {
        console.error('Error al obtener series:', error);
        setError('Error al obtener series. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSeries();
  }, []);

  const searchSeries = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    setDisplayedSeries(
      allSeries.filter((series) => series.name.toLowerCase().includes(searchTermLowerCase))
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <div className="Serie">
      <h1>Series</h1>
      <div className="search_container">
        <input
          className="search_series"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              searchSeries();
            }
          }}
          placeholder="Search serie..."
        />
        <button className="btn_search_series" onClick={searchSeries}>
          Search
        </button>
      </div>
      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className="container_serie">
        {displayedSeries.map((series) => (
          <div className="info_serie" key={series.id}>
              <Link to={`/details/serie/${series.id}`}>
              <img className="img_serie" src={'https://image.tmdb.org/t/p/w500' + series.poster_path} alt={series.name} />
              <h2 className="title_serie">{series.name}</h2>
              </Link>
            <div className="info_bottom">
              <p className="releaseDate_serie">{formatDate(series.first_air_date)}</p>
              <div className="iconsSerie">
                <button
                  className="btn_favoriteSerie"
                  title="Add to favorite"
                  onClick={() => toggleFavorite(series)}
                >
                  {isFavorite(series.id) ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}
                </button>
                <a href={`/details/serie/${series.id}`} title="Play">
                  <FontAwesomeIcon icon={faPlay} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayedSeries.length === 0 && !isLoading && <p>No se encontraron resultados.</p>}
    </div>
  );
};

export default Series;
