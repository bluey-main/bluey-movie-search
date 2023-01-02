import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import noimage from './images/noimage.jpg'
import Paginate from "react-paginate";
import './pagination.css'


const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
  // const OMDB_URL =`http://www.omdbapi.com/?i=tt3896198&apikey=35c46830&s=${search}`
  const divRef = useRef(null)
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4930fc21f87714b5934277f202b2a9f&page=${pageNumber + 1}`
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=c4930fc21f87714b5934277f202b2a9f&page=${pageNumber + 1}&query=${search}`




  useEffect(() => {
    // setSearch('avengers')

    if(search != ''){
      axios.get(SEARCH_URL)
        .then((response) => {
          // console.log(response.data.total_pages);
          setMovies(response.data.results);
          setError('');
          if(response.data.total_pages < 100){
            setPageCount(response.data.total_pages)
  
          }else{
            setPageCount(100)
          }
          
        
        })
        .catch((error) =>  {
          // console.log(error);
          setError(error);
          // setError('No Movies Found');
          setMovies([]);

        })
    }else{
      axios.get(API_URL)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
        setError('');
        
        if(response.data.total_pages < 100){
          setPageCount(response.data.total_pages)

        }else{
          setPageCount(300)
        }

      })

      .catch((error) =>  {
        // console.log(error);
        setError(error);
        // setError('No Movies Found');
        setMovies([]);

      })
    }
  }, [search, pageNumber])

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected)
    scrollToTop()
  };





  const scrollToTop = () => {
     divRef.current.scrollTop = 0
  }



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
                scrollToTop()
                setPageNumber(0)
              }        
          }} />

          
        <Paginate
            pageCount={pageCount}
            pageRangeDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            marginPagesDisplayed={0.1}
            // forcePage={page}
            previousClassName="previous"
            nextClassName="next"
            pageClassName="page"
            pageLinkClassName="page-link"
            activeClassName="active"
            breakClassName="ellipsis"
        />
      
      </div>

      <div className="movie-display-section" ref={divRef}>
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
              <p className="movie-year">Date: {movie.release_date}</p>
              <p className="movie-type">Rating: {movie.vote_average}</p>
            </div>
          </div>
        </div>
        ))}
      </div>
      

     
    </div>
   
  )
}

export default App