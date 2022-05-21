import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { watchListSlice } from "../app/modules/Movies/_redux/watchlist/watchlistSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  watchList: watchListSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
