import { types } from "../constants"
import { fetchTMDBData, fetchSearchedTMDBData, fetchTMDBVideo } from "../../services"


const fetchDataRequest = () => {
    return {
        type: types.FETCH_TMDB_DATA_REQUEST
    }
}

const fetchDataSuccess = (data: any, selectedTab: number) => {
    return {
        type: types.FETCH_TMDB_DATA_SUCCESS,
        payload: data.data.results.slice(0, 10),
        selectedTab: selectedTab
    }
}

const fetchDataFailure = (err: any) => {
    return {
        type: types.FETCH_TMDB_DATA_FAILURE,
        payload: err
    }
}

const fetchSearchedDataRequest = () => {
    return {
        type: types.FETCH_SEARCHED_TMDB_DATA_REQUEST
    }
}

const fetchSearchedDataSuccess = (data: any,) => {
    return {
        type: types.FETCH_SEARCHED_TMDB_DATA_SUCCESS,
        payload: data.data.results
    }
}

const fetchSearchedDataFailure = (err: any) => {
    return {
        type: types.FETCH_SEARCHED_TMDB_DATA_FAILURE,
        payload: err
    }
}

const fetchVideoRequest = () => {
    return {
        type: types.FETCH_VIDEO_REQUEST
    }
}

const fetchVideoSuccess = (data: any) => {
    return {
        type: types.FETCH_VIDEO_SUCCESS,
        payload: data.data.results.filter((video: any) => video.type === "Trailer" && video.site === "YouTube")
    }
}

const fetchVideoFailure = (err: any) => {
    return {
        type: types.FETCH_VIDEO_FAILURE,
        payload: err
    }
}

const resetVideoRequest = () => {
    return {
        type: types.RESET_VIDEO_REQUEST
    }
}

const resetVideoSuccess = () => {
    return {
        type: types.RESET_VIDEO_SUCCESS,
    }
}

const resetVideoFailure = (err: any) => {
    return {
        type: types.RESET_VIDEO_FAILURE,
        payload: err
    }
}

const setQueryRequest = () => {
    return {
        type: types.SET_QUERY_REQUEST
    }
}

const setQuerySuccess = (data: any) => {
    return {
        type: types.SET_QUERY_SUCCESS,
        payload: data
    }
}

const setQueryFailure = (err: any) => {
    return {
        type: types.SET_QUERY_FAILURE,
        payload: err
    }
}

export const fetchData = (selectedTab: number) => {
    return async (dispatch: any) => {
        dispatch(fetchDataRequest())
        try {
            if(selectedTab === 0) {
                const tmdbData = await fetchTMDBData("tv")
                dispatch(fetchDataSuccess(tmdbData, selectedTab))
            }
            else if(selectedTab === 1) {
                const tmdbData = await fetchTMDBData("movie")
                dispatch(fetchDataSuccess(tmdbData, selectedTab))
            }
            
        } catch(err) {
            dispatch(fetchDataFailure(err))
        }
    }
}

export const fetchSearchedData = (selectedTab: number, query: string) => {
    return async (dispatch: any) => {
        dispatch(fetchSearchedDataRequest())
        try {

            if(selectedTab === 0) {
                const tmdbData = await fetchSearchedTMDBData("tv", query)
                dispatch(fetchSearchedDataSuccess(tmdbData))
            }
            else if(selectedTab === 1) {
                const tmdbData = await fetchSearchedTMDBData("movie", query)
                dispatch(fetchSearchedDataSuccess(tmdbData))
            }
            
        } catch(err) {
            dispatch(fetchSearchedDataFailure(err))
        }
    }
}
export const fetchVideo = (fetch: string, id: number) => {
    return async (dispatch: any) => {
        dispatch(fetchVideoRequest())
        try {
            const tmdbVideo = await fetchTMDBVideo(fetch, id)
            dispatch(fetchVideoSuccess(tmdbVideo))
        } catch(err) {
            dispatch(fetchVideoFailure(err))
        }
    }
}

export const resetVideo = () => {
    return async (dispatch: any) => {
        dispatch(resetVideoRequest())
        try {
            dispatch(resetVideoSuccess())
        } catch(err) {
            dispatch(resetVideoFailure(err))
        }
    }
}

export const setQuery = (query: string) => {
    return async (dispatch: any) => {
        dispatch(setQueryRequest())
        try {
            dispatch(setQuerySuccess(query))
        } catch(err) {
            dispatch(setQueryFailure(err))
        }
    }
}