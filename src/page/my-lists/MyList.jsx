import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/mylist.css'; 

const MyList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="MyList">
      <h1>Mi Lista</h1>
      <div className="favorites">
        {favorites.length === 0 ? (
          <p>No tienes elementos favoritos.</p>
        ) : (
          favorites.map((item) => (
            <div className="container_favorite" key={item.id}>
              <Link to={`/details/movie/${item.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} alt={item.title} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyList;
