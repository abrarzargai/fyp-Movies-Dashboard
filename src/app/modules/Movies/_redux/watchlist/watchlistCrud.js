import axios from "axios";

export const WATCHLIST_URL = "/watchlist";

// CREATE =>  POST: add a new movie to the watchlist
export function addMovieToWatchList(movie) {
  return axios.post(`${WATCHLIST_URL}/add`, movie);
}

// READ
export function getWatchList() {
  return axios.get(`${WATCHLIST_URL}/getOneUserWatchList`);
}

// DELETE => delete the movie from the watchlist
export function deleteMovieFromWatchList(data) {
  return axios.delete(`${WATCHLIST_URL}/delete`, { data });
}
