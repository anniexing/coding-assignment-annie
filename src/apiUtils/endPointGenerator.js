import { API_KEY, ENDPOINT, ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "./constants";
export const generateSearchMovieEndPoint = (searchQuery) => {
  return `${ENDPOINT}${ENDPOINT_SEARCH}&query=`+searchQuery
}

export const generateFetchMovieByIdEndPoint = (id) => {
  return `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
}

export const generateMoviesDiscoverEndPoint = () => {
  return `${ENDPOINT}${ENDPOINT_DISCOVER}`;
}
