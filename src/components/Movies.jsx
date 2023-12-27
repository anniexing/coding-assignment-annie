import { useSelector} from 'react-redux';
import Movie from './Movie'
import '../styles/movies.scss'

const Movies = () => {
    const {movies, isFetching} = useSelector(state => state.movies);
    return (
        <div data-testid="movies" className="movies_list">
            {movies?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                    />
                )
            })}
            {isFetching && <p>Loading...</p>}
        </div>
    )
}

export default Movies
