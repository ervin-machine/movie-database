import React, {useState, useEffect} from 'react'
import './Tabs.css'
import MovieList from '../MovieList/MovieList';
import SerieList from '../SerieList/SerieList';

function Tabs() {
    const [isTabClicked, setTabClicked] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [serieList, setSerieList] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const style = {
        on: {
            display: 'block',
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
        Promise.all([
            await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb'),
            await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb&language=en-US&page=2')
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data, data1]) => {
            setLoading(true)
            let movies = []
            movies = data.results.concat(data1.results)
            setMovieList(movies)
        })
    }

    const fetchSerieList = async () => {
        Promise.all([
            await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb&language=en-US&page=1'),
            await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=5e9d7e978fe9c629e6a149da1eeb9dbb&language=en-US&page=2')
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data, data1]) => {
            setLoading(true)
            let series = []
            series = data.results.concat(data1.results)
            setSerieList(series)
        })}

    useEffect( () => {
        fetchMovieList();
        fetchSerieList();
    },[]);

    const searchInput = (event) => {
        setInput(event.target.value);
        if(event.target.value === ""){
            setSearching(false);
        }
        else{
            setSearching(true)
        }
        
    }
    return (
        <div>
            <div className="search-section">
            <input 
                className="search"
                type="text"
                placeholder="Type to search"
                onChange={searchInput}
            />
            <div style={searching ? style.on : style.off} class="spinner"></div>
            </div>
            <div className="tabs">
                <button className="tab-item" onClick={OnClickTab}>Movies</button>
                <button className="tab-item" onClick={OffClickTab}>Series</button>
            </div>
            <div className="contents">
                <div className="movie-content" style={isTabClicked ? style.on : style.off}>
                    <MovieList movieList={movieList} loading={loading} input={input} search={searching}/> 
                </div>
                <div className="serie-content" style={isTabClicked ? style.off : style.on}>
                    <SerieList serieList={serieList} loading={loading} input={input} />
                </div>
            </div>
        </div>
        
    )
}

export default Tabs
