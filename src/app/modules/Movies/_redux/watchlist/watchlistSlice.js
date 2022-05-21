import {createSlice} from "@reduxjs/toolkit";

const initialWatchListState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  watchListForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialWatchListState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getWatchList
    watchListFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // deletedMovieFromWatchList
    deletedMovieFromWatchList: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el._id !== action.payload._id);
    },
  }
});
