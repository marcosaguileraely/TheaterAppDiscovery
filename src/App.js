import React, { useEffect, useState } from 'react';
import './style.css';

const net = require('./Utils/net');
const util = require('./Utils/utils');

import './App.css';

export default function App() {
  useEffect(() => {
    startDiscoveryMovies();
  }, []);

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDiscover, setIsDiscover] = useState(true)

  const startDiscoveryMovies = async () => {
    const movies = await net.fetchMovies();
    console.log(movies);
    //console.log(JSON.stringify(movies));
    setMovies(movies);
  };

  const searchMovies = async () => {
    const searchMovies = await net.searchMovie(searchText)
    setMovies(searchMovies);
  }

  const changeSearch = async (text) => {
    setSearchText(text)
    setIsDiscover(false)
    if (document.getElementById("searchInput").value.length == 0) {
      startDiscoveryMovies()
      setIsDiscover(true)
    }
  }

  /**
   * 
   * @param {*} e: Data value inbound from Radio button
   * isDiscover: Returns (false) when 'Searching movie...' has been activated by entering any title to search,
   *             and, return (true) when no search action is actived.   
   */
  const changeRank = async (e) => {
    var value = e.target.value

    //Retrieving rank comparation object. This object makes easy the filtering process
    var rankObject = await util.filterRank(value)[0]
    console.log(rankObject)

    if (!isDiscover) {
      console.log("Search mode...")
      console.log(rankObject)
      //Filtering rank movies in searchin mode...
      var rankSearchedMovies = await net.searchMovie(searchText)
      console.log(rankSearchedMovies)
      //Setting the result into hook to be re-render in UI
      //console.log(rankSearchedMovies.filter(item => item.vote_average > rankObject.min && item.vote_average <= rankObject.max))
      setMovies(rankSearchedMovies.filter(item => item.vote_average > rankObject.min && item.vote_average <= rankObject.max));
    }

    console.log("Discover mode...")
    //Filtering rank movies in discovery mode
    var rankMovies = await net.fetchMovies()
    //Setting the result into hook to be re-render in UI
    setMovies(rankMovies.filter(item => item.vote_average > rankObject.min && item.vote_average <= rankObject.max))
  }

  const resetSearchText = () => {
    startDiscoveryMovies()
    setIsDiscover(true)
    setSearchText("")
    document.getElementById("searchInput").value = ""
  }

  return (
    <div>

      <div className="grid-container">
        <div className="item1">
          <section>
            <input id="searchInput" name="searchInput" type="text" value={searchText} onChange={e => changeSearch(e.target.value)} placeholder="Search movies..." />
            <button onClick={searchMovies}>Search</button>
            {<button onClick={resetSearchText}>Reset</button>}
          </section>
        </div>
        <div className="item2">
          <section>
            <fieldset>
              <legend>Filter by rating</legend>
              <label>
                <input type="radio" name="numero" value="1" onClick={e => changeRank(e)} />
              </label>
              <label>
                <input type="radio" name="numero" value="2" onClick={e => changeRank(e)} />
              </label>
              <label>
                <input type="radio" name="numero" value="3" onClick={e => changeRank(e)} />
              </label>
              <label>
                <input type="radio" name="numero" value="4" onClick={e => changeRank(e)} />
              </label>
              <label>
                <input type="radio" name="numero" value="5" onClick={e => changeRank(e)} />
              </label>
            </fieldset>
            <span><a href="#" onClick={startDiscoveryMovies}>Reset filter</a></span>
          </section>
        </div>
        <div className="item3">
          <section>
            <h1>Discover what's new our theater</h1>
            <div className="container">
              <div>
                {movies.map(movie => {
                  return <div key={movie.id} className="box" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780/${movie.backdrop_path}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <span className="movie-title">{`${movie.original_title}`}</span>
                    <span>{`${movie.release_date}`}</span>
                  </div>
                })}
              </div>
            </div>
          </section>

        </div>
        <div className="item4">
          Developed by @marcode_ely
        </div>
      </div>
    </div>
  );
}
