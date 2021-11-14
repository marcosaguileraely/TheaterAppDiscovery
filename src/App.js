import React, { useEffect, useState } from 'react';
import './style.css';

const net = require('./Utils/net');

import './App.css';

export default function App() {
  useEffect(() => {
    startDiscoveryMovies();
  }, []);

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterRank, setFilterRank] = useState("")

  const startDiscoveryMovies = async () => {
    const movies = await net.fetchMovies();
    console.log(movies);
    setMovies(movies);
  };

  const searchMovies = async () => {
    const searchMovies = await net.searchMovie(searchText)
    setMovies(searchMovies);
  }

  const changeSearch = async (text) => {
    setSearchText(text)
    if (document.getElementById("searchInput").value.length == 0) {
      startDiscoveryMovies()
    }
  }

  const changeRank = (e) => {
    console.log(e.target.value)
  }

  const resetSearchText = () => {
    startDiscoveryMovies()
    setSearchText("")
    document.getElementById("searchInput").value = ""
  }

  return (
    <div>

      <section>
        <input id="searchInput" name="searchInput" type="text" value={searchText} onChange={e => changeSearch(e.target.value)} placeholder="Search movies..." />
        <button onClick={searchMovies}>Search</button>
        {<button onClick={resetSearchText}>X</button>}

        <fieldset>
          <legend>Filter by rating</legend>
          <label>
            <input type="radio" name="numero" value="1" onClick={ e => changeRank(e) } />
          </label>
          <label>
            <input type="radio" name="numero" value="2" onClick={ e => changeRank(e) } />
          </label>
          <label>
            <input type="radio" name="numero" value="3" onClick={ e => changeRank(e) } />
          </label>
          <label>
            <input type="radio" name="numero" value="4" onClick={ e => changeRank(e) } />
          </label>
          <label>
            <input type="radio" name="numero" value="5" onClick={ e => changeRank(e) } />
          </label>
        </fieldset>
      </section>

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
  );
}
