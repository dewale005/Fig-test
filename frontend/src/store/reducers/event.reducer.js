import * as t from "../types";

let initialState = {
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0
  };

  export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case t.FETCH_EVENT_DATA:
        return {
          ...state,
          results: action.payload.results,
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
          totalResults: action.payload.totalResults,
        };
      default:
        return state;
    }
  };