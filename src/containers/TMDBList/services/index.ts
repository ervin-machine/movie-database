import axios from "axios";
import { REACT_APP_API_URL, AUTH_KEY } from '../../../config/index'

const yourConfig = {
    headers: {
        Authorization: "Bearer " + AUTH_KEY
    }
}


export const fetchTMDBData = async (fetch: string) => {
    const res = await axios.get(`${REACT_APP_API_URL}${fetch}/top_rated?language=en-US&page=1`, yourConfig);
    return res;
}

export const fetchSearchedTMDBData = async (fetch: string, query: string) => {
    const res = await axios.get(`${REACT_APP_API_URL}search/${fetch}?query=${query}&language=en-US&page=1`, yourConfig);
    return res;
}

export const fetchTMDBVideo = async (fetch: string, id: number) => {
    const res = await axios.get(`${REACT_APP_API_URL}${fetch}/${id}/videos?language=en-US`, yourConfig);
    return res;
}
