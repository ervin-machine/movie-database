import { produce } from "immer"
import { AnyAction } from "@reduxjs/toolkit";

export interface TMDBListState {
    selectedTab: number;
    TMDBData: any[];
    isLoading: boolean;
    errorMessage: boolean;
    error?: string;
    query?: string;
    video?: string;
}

  const initialState: TMDBListState = {
    selectedTab: 0,
    TMDBData: [],
    isLoading: false,
    errorMessage: false,
    error: undefined,
    query: "",
    video: undefined
  };

  const TMDBDataReducer = (state = initialState, action: AnyAction)  => {
    return produce(state, (draft) => {
       switch (action.type) {
        case 'FETCH_TMDB_DATA_REQUEST':
           draft.isLoading = true;
           break;
        case 'FETCH_TMDB_DATA_SUCCESS':
           draft.isLoading = false;
           draft.TMDBData = [...action.payload];
           draft.selectedTab = action.selectedTab;
           break;
        case 'FETCH_TMDB_DATA_FAILURE':
          draft.isLoading = false;
          break;
        case 'FETCH_SEARCHED_TMDB_DATA_REQUEST':
          draft.isLoading = true;
          break;
        case 'FETCH_SEARCHED_TMDB_DATA_SUCCESS':
          draft.isLoading = false;
          draft.TMDBData = [...action.payload];
          break;
        case 'FETCH_SEARCHED_TMDB_DATA_FAILURE':
          draft.isLoading = false;
          break;
        case 'FETCH_VIDEO_REQUEST':
          draft.isLoading = true;
          break;
        case 'FETCH_VIDEO_SUCCESS':
          draft.isLoading = false;
          draft.video = action.payload
          break;
        case 'FETCH_VIDEO_FAILURE':
          draft.isLoading = false;
          break
        case 'RESET_VIDEO_REQUEST':
          draft.isLoading = true;
          break;
        case 'RESET_VIDEO_SUCCESS':
          draft.isLoading = false;
          draft.video = undefined;
          break;
        case 'RESET_VIDEO_FAILURE':
          draft.isLoading = false;
          break
        case 'SET_QUERY_REQUEST':
          draft.isLoading = true;
          break;
        case 'SET_QUERY_SUCCESS':
          draft.isLoading = false;
          draft.query = action.payload
          break;
        case 'SET_QUERY_FAILURE':
          draft.isLoading = false;
          break;
        default:
           break;
       }
     });
    }

export default TMDBDataReducer