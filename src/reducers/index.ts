import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import TMDBDataReducer from "../containers/TMDBList/store/reducers"

export default function createReducer(history: any, injectReducers = {}) {
    const rootReducer = combineReducers({
        tmdbData: TMDBDataReducer,
        router: connectRouter(history),
        ...injectReducers
    })

    return rootReducer
}