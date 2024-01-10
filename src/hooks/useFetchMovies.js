import { useEffect, useState } from 'react';
import { useLazyFetchMoviesQuery } from '../store/moviesPaginationAPI';
const useFetchMovies = ({ page, searchQuery }) => {
  const [isExecuted, setIsExecuted] = useState(false);
  const [fetchMovies] = useLazyFetchMoviesQuery();

  useEffect(() => {
    if(!isExecuted) {
      fetchMovies({ page, searchQuery });
      setIsExecuted(true);
    }

  }, [page, searchQuery,isExecuted]);

  return { fetchMovies }
}

export default useFetchMovies;
