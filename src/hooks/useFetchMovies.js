import { useEffect, useState } from 'react';
import { useLazyFetchMoviesQuery } from '../store/moviesPaginationAPI';
const useFetchMovies = (page) => {
  const [isExecuted, setIsExecuted] = useState(false);
  const [fetchMovies] = useLazyFetchMoviesQuery();

  useEffect(() => {
    if(!isExecuted) {
      fetchMovies({ page });
      setIsExecuted(true);
    }

  }, [page, isExecuted]);

  return { fetchMovies }
}

export default useFetchMovies;
