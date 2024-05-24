import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../css/detailView.css'; 

const DetailsSerie = () => {
  const { id } = useParams(); 
  const [series, setSeries] = useState(null);
  const [otherSeries, setOtherSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1'
          }
        });
        setSeries(response.data);
        fetchOtherSeries();
      } catch (error) {
        console.error('Error al obtener detalles de la serie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchOtherSeries = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
          params: {
            api_key: '53f3e1d3fbfed79960a6076096d187b1',
            page: 1
          }
        });
        setOtherSeries(response.data.results.slice(0, 7));
      } catch (error) {
        console.error('Error al obtener otras series:', error);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  return (
    <div className="detailPage">
      {isLoading ? (
        <p className="loading_detailView">Cargando...</p>
      ) : series ? (
        <div className="detailView">
          <img className="img_poster" src={'https://image.tmdb.org/t/p/w500' + series.poster_path} alt={series.name} />
          <div className="info_detailView">
            <h2 className="title">{series.name}</h2>
            <div className="info_top">
              <p className="rating_detailView">{formatRating(series.vote_average)} ⭐️</p>
              <p className="releaseDate_detailView">{formatDate(series.first_air_date)}</p>
            </div>
            <p className="description_detailView">{series.overview}</p>
          </div>
        </div>
      ) : (
        <p>Error al cargar la serie. Inténtalo de nuevo más tarde.</p>
      )}
      <div className="container_other">
        <h1 className="text_Others">Others</h1>
        <div className="otherMovies">
          {otherSeries.map((otherSeries) => (
            <div className="movieCard" key={otherSeries.id}>
              <Link to={`/details/serie/${otherSeries.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500' + otherSeries.poster_path} alt={otherSeries.name} />
                <h3>{otherSeries.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsSerie;
