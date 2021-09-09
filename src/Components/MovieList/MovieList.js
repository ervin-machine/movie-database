import React, { useState } from 'react';
import './MovieList.css'


const MovieList = ({movieList=[], input = '', loading=false}) => {
    const [isSelected, setSelected] = useState({});
    const [view, setView] = useState(false);
    const [searchResult, setSearchResult] = useState(true);

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
        {loading ? movieList.filter((movie) => {
            if(input === "") {
                return movie
            }  else if(movie.title.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                    return movie
                }
            }).slice(0, 30).map((movie) => {
                return (
                    <>
                    <div>
                        <img className="movie-card" 
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                        alt="movie" 
                        onClick = {() => onMovieSelect(movie)}
                        />
                        <p>{movie.title}</p>
                    </div>
                    </>
                )
            })
        : <h2>loading</h2>
        }
    </div>
    {
        isSelected.poster_path && (
            <div className="view" style={view ? style.on : style.off}>
                <i class="fas fa-long-arrow-alt-left" onClick={closeView}></i>
                <img className="view-image" 
                    src={`https://image.tmdb.org/t/p/original${isSelected.poster_path}`} 
                    alt="movie" 
                    />
                <h3 className="movie-title">{isSelected.title}</h3>
                <p className="movie-desc">{isSelected.overview}</p>
            </div>
        )
    }
    </>
  );
}

export default MovieList