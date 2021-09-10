import React, { useState, useEffect } from 'react';
import './SerieList.css'
import $ from 'jquery';

const SerieList = ({serieList=[], input = '', loading=false}) => {
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

    const onSerieSelect = (serie) => {
        setSelected(serie);
        setView(true);
    }

    const closeView = () => {
        setView(false);
    }
    const searchResult = () => {
        if($('.serie-list').is(':empty')){
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
    <p className="search-result">Series not found</p>
    <div className="serie-list row-cols-xxl-3">
        {loading ? serieList.filter((serie) => {
            if(input === "") {
                return serie
            }  else if(serie.name.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                    return serie
                }
            }).slice(0, 30).map((serie) => {
                return (
                    <>
                    <ul>
                         <li>
                            <img className="serie-card" 
                            src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                            alt="serie" 
                            onClick = {() => onSerieSelect(serie)}
                    />
                    <p className="serie-name">{serie.name}</p>
                        </li>
                    </ul>
                    </>
                )
            })
        : 
        <div className="loading">
        <div class="spinner"></div>
        <h2 className="loading-text">loading</h2>
    </div>
        }
    </div>
    {
        isSelected.poster_path && (
            <div className="view-serie" style={view ? style.on : style.off}>
                <i class="back fas fa-long-arrow-alt-left" onClick={closeView}></i>
                <img className="view-image" 
                    src={`https://image.tmdb.org/t/p/original${isSelected.poster_path}`} 
                    alt="movie" 
                    />
                <h3 className="serie-title">{isSelected.name}</h3>
                <p className="serie-desc">{isSelected.overview}</p>
            </div>
        )
    }
    </>
  );
}

export default SerieList