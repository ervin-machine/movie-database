import React, {useState, useEffect} from 'react'
import './Tabs.css'
import MovieList from '../MovieList/MovieList';
import SerieList from '../SerieList/SerieList';


function Tabs() {
    const [isTabClicked, setTabClicked] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [serieList, setSerieList] = useState([]);
    const [input, setInput] = useState('');

    const style = {
        on: {
            display: 'flex',
        },
        off: {
            display: 'none',
        }
    }

    const OnClickTab = () => {
        setTabClicked(true);
    }

    const OffClickTab = () => {
        setTabClicked(false);
    }

    const fetchMovieList = async () => {
        return await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb')
          .then(response => response.json())
          .then(data => {
             setMovieList(data.results)
           });}

    const fetchSerieList = async () => {
           return await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb')
          .then(response => response.json())
          .then(data => {
             setSerieList(data.results)
           });}

    useEffect( () => {
        fetchMovieList();
        fetchSerieList();
    },[]);

    const searchInput = async(event) => {
        setInput(event.target.value);
        
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="search country"
                onChange={searchInput}
            />
            <div className="tabs">
                <button className="tab-item" onClick={OnClickTab}>Movies</button>
                <button className="tab-item" onClick={OffClickTab}>Series</button>
            </div>
            <div className="contents">
                <div className="movie-content" style={isTabClicked ? style.on : style.off}>
                    {movieList.filter((movie) => {
                        if(input === "") {
                            return movie
                        }  else if(input.length === 3 && movie.title.toLowerCase().includes(input.toLowerCase())) {
                            return movie
                        } 
                    }).map((movie) => {
                        return (
                            <MovieList moviename={movie.title} poster_path={movie.poster_path}/>
                        )
                    })
                 }
                    
                </div>
                <div className="serie-content" style={isTabClicked ? style.off : style.on}>
                    <SerieList serieList={serieList} />
                </div>
            </div>
        </div>
        
    )
}

export default Tabs
