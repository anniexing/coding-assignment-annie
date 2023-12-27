import {getData} from "./apiHelpers";
export const getMoviesFromApi = async (apiUrl) => {
  return getData(apiUrl);
}

export const getMovieByMovieIdFromApi = async (apiUrl) => {
  return getData(apiUrl);
}
