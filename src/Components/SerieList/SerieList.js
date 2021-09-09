import React, { useState } from 'react';
import './SerieList.css'


const SerieList = ({serieList=[], input = '', loading=false}) => {
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

    const onSerieSelect = (serie) => {
        setSelected(serie);
        setView(true);
    }

    const closeView = () => {
        setView(false);
    }

  return (
    <>
    <div className="serie-list">
        {loading ? serieList.filter((serie) => {
            if(input === "") {
                return serie
            }  else if(serie.name.substr(2).toLowerCase().includes(input.substr(2).toLowerCase())) {
                    return serie
                }
            }).slice(0, 30).map((serie) => {
                return (
                    <>
                    <div>
                        <img className="serie-card" 
                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                        alt="serie" 
                        onClick = {() => onSerieSelect(serie)}
                        />
                        <p>{serie.name}</p>
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
                <button onClick={closeView}>X</button>
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