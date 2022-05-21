import * as requestFromServer from "./watchlistCrud";
import { watchListSlice, callTypes } from "./watchlistSlice";

const { actions } = watchListSlice;

export const getWatchList = () => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  try {
    const response = await requestFromServer
      .getWatchList();
    const { Data } = response.data;
    dispatch(actions.watchListFetched({ totalCount: Data.length, entities: Data }));
  } catch (error) {
    error.clientMessage = "Can't find watchlist movies";
    dispatch(actions.catchError({ error, callType: callTypes.list }));
  }
};

export const deleteMovieFromWatchList = movie => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .deleteMovieFromWatchList(movie);
    dispatch(actions.deletedMovieFromWatchList({ _id: movie._id }));
    const { message } = response.data;
    return { message, status: response.data.success }
  } catch (error) {
    error.clientMessage = "Can't delete movie from watchlist";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
    return { message: error?.response.data.message || error.clientMessage || error, status: "error" }
  }
};

export const addMovieToWatchList = movieforAdd => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .addMovieToWatchList(movieforAdd);
    if (response.data.success) {
      const { message } = response.data;
      return { message, status: response.data.success }
    }
    console.log(response.data)
    return { message: response.data.message, status: response.data.success }
  } catch (error) {
    error.clientMessage = "Can't add movie to watchlist";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
    return { message: error?.response.data.message || error.clientMessage || error, status: "error" }
  }
};
