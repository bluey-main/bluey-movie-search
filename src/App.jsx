import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import noimage from './images/noimage.jpg'


const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4930fc21f87714b5934277f202b2a9f&page=1'
  const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=c4930fc21f87714b5934277f202b2a9f&query=${search}`
  const OMDB_URL =`http://www.omdbapi.com/?i=tt3896198&apikey=35c46830&s=${search}`


  useEffect(() => {
    // setSearch('avengers')

    if(search){
      axios.get(SEARCH_URL)
        .then((response) => {
          console.log(response.data);
          setMovies(response.data.results);
          setError('');
        
        })
        .catch((error) =>  {
          console.log(error);
          setError(error);
          // setError('No Movies Found');
          setMovies([]);

        })
    }
  }, [search])

  return(
    <div className="App">
      

      <div className="search-section">
          <h3>BLUEY'S MOVIE SEARCH</h3>
          <input type="text"
            placeholder="what movie are you looking for?"
          
           onKeyUp={(e) => {
              e.preventDefault();
              if(e.key == "Enter"){
                if(e.target.value != ''){
                  setSearch(e.target.value)
                }
              }        
          }} />
      </div>

      <div className="movie-display-section">
        {error && <p className="err">{error}</p>}
        
        {movies.map((movie) => (
          <div className="movie-container">
          <div className="poster-div">
            {movie.poster_path != null ? (<img src={IMG_PATH .concat(movie.poster_path)} alt="" />) : (<img src={noimage} alt="" />)}
            
          </div>
          <div className="movie-text-div">
            <div className="h1-div">
              <h1 className="movie-title">{movie.title}</h1>
            </div>
            
            <div className="minor-text">
              <p className="movie-year">year: {movie.Year}</p>
              <p className="movie-type">type: {movie.Type}</p>
            </div>
          </div>
        </div>
        ))}
      </div>
      

     
    </div>
   
  )
}

export default App