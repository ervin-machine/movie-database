import React, { useState } from 'react';
import './MovieList.css'


const MovieList = ({moviename, poster_path}) => {
    const [isSelected, setSelected] = useState({});
    const [view, setView] = useState(false);

    const style = {
        on: {
            display: 'block',
        },
        off: {
            display: 'none',
        }
    }

    const onMovieSelect = (movie) => {
        setSelected(movie);
        setView(true);
    }

    const closeView = () => {
        setView(false);
    }

  return (
    <>
    <div className="movie-list">
        <img className="movie-card" 
            src={`https://image.tmdb.org/t/p/original${poster_path}`} 
            alt="movie"
            onClick = {() => onMovieSelect(poster_path)}
         />
        <p>{moviename}</p> 
    </div>
    {
        poster_path && (
            <div className="view" style={view ? style.on : style.off}>
                <button onClick={closeView}>X</button>
                <h3>{moviename}</h3>
            </div>
        )
    }
    </>
  );
}

export default MovieList