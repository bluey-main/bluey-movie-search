import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import noimage from './images/noimage.jpg'


const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    // setSearch('avengers')

    if(search){
      axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=35c46830&s=${search}`)
        .then((response) => {
          if(response.data.Response === 'True'){
            console.log(response.data);
            setMovies(response.data.Search)
            setError('');
          }else{
            setError('No Movies Found');
            console.log(response.data);
            setMovies([])
          }
          
        })
        .catch((error) =>  {
          console.log(error)
          setError(error)
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
            {movie.Poster != 'N/A' ? (<img src={movie.Poster} alt="" />) : (<img src={noimage} alt="" />)}
            
          </div>
          <div className="movie-text-div">
            <div className="h1-div">
              <h1 className="movie-title">{movie.Title}</h1>
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