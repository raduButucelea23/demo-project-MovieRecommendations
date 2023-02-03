import * as helpers from "./helpers.js";

const tmdbKey = '<api_key>';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

    try{
        const response = await fetch(urlToFetch);
    if (response.ok) {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        return genres;
    } 
    throw new Error('Request failed! RB');
    } catch(error) {
        console.error(error);
    }
};

const getMovies = async () => {
  const selectedGenre = helpers.getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try{
    const response = await fetch(urlToFetch);
    
    if (response.ok) {
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        console.log(movies);
        return movies;
    
  }} catch(error) {
    console.error(error);
  }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const MovieInfoEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + MovieInfoEndpoint + requestParams;

    try{
        const response = await fetch(urlToFetch);
        
        if (response.ok) {
            const movieInfo = await response.json();
            console.log(movieInfo);
            return movieInfo;
        
      }} catch(error) {
        console.error(error);
      }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    helpers.clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = helpers.getRandomMovie(movies);
  const randomMovieInfo = await getMovieInfo(randomMovie);

  helpers.displayMovie(randomMovieInfo);
};



getGenres().then(helpers.populateGenreDropdown);
playBtn.onclick = showRandomMovie;

//base URL for the API. Request examples:
//https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
//https://api.themoviedb.org/4/list/1?api_key=<<api_key>>
//https://api.themoviedb.org/3/movie/550?api_key=3c93b9d138bb1ce6e52d0d9026cf2ac9