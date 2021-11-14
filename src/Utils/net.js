import axios from 'axios';

const API_KEY = "55c916ff4e95bbeafef3cb409c9977af"
export async function fetchMovies() {
  return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
    .then((res) => {
      return res.data.results
    });
}

export async function searchMovie(text) {
  console.log(text)
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&language=en-US`)
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    });
}
