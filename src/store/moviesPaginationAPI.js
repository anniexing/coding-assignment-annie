import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../apiUtils/constants';
import { updateIsError, updateIsFetching, updateMovies } from './moviesSlice';
import moviesAPI from './moviesAPI';

const getPath = ({ page, searchQuery })=> {
  if (searchQuery) {
    return `${ENDPOINT_SEARCH}&query=` + searchQuery;
  } else {
    return `${ENDPOINT_DISCOVER}&page=${page}`;
  }
};
export const moviesPaginationAPI = moviesAPI.injectEndpoints({
  endpoints:(build) => ({
    fetchMovies:build.query({
      query:(requestParams) => getPath(requestParams),
      async onQueryStarted(args,{dispatch, queryFulfilled, requestId}){
        try {
          dispatch(updateIsFetching({ requestId }))
          const {data} = await queryFulfilled;
          dispatch(updateMovies({requestId, data, args}));
        }catch (e) {
          dispatch(updateIsError({requestId}))
        }
      },
    })
  })
});

export const { useLazyFetchMoviesQuery } = moviesPaginationAPI;
