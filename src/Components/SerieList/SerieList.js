import React, {useState} from 'react';
import './SerieList.css'


const SerieList = ({serieList=[]}) => {
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
  return (
    <>
    <div className="serie-list">
        {serieList.map(serie => {
            return(
                <div>
                <img className="serie-card" 
                src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                alt="serie" 
                onClick = {() => onSerieSelect(serie)}
                />
                <h1>{serie.original_name}</h1>
                </div>
            )
        })}  
    </div>
    {
        isSelected.poster_path && (
            <div className="view" style={view ? style.on : style.off}>
                <button onClick={closeView}>X</button>
                <h3>{isSelected.original_name}</h3>
            </div>
        )
    }
    </>
  );
}

export default SerieList