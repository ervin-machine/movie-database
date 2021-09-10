import React, { useEffect, useState } from 'react';
import './MovieList.css'
import $ from 'jquery';

const MovieList = ({movieList=[], input = '', loading=false}) => {
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
    const searchResult = () => {
        if($('.movie-list').is(':empty')){
            $('.search-result').show();
        }
        else {
            $('.search-result').hide();
        }
    }
    useEffect( () => {
        searchResult();
    });
    
  return (
    <>
    <p className="search-result">Movies not found</p>
    <div className="movie-list">
    {loading ? movieList.filter(movie => {
        if(input === "") {
            $('.parag').hide();
            return movie
        }  else if(movie.title.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
            return movie
            }
        }).slice(0, 30).map((movie) => {
            return (
                <>
                 <div className="list">
                    <img className="movie-card" 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                    alt="movie" 
                    onClick = {() => onMovieSelect(movie)}
                    />
                    <p className="movie-name">{movie.title}</p>
                </div>
                </>
            )
        })
    : <div className="loading">
        <div class="spinner"></div>
        <h2 className="loading-text">loading</h2>
    </div>
    }
</div>
    {
        isSelected.poster_path && (
            <div className="view-movie" style={view ? style.on : style.off}>
                <i class="back fas fa-long-arrow-alt-left" onClick={closeView}></i>
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