import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearAllStarred } from '../store/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const Starred = () => {
    const { starredMovies } = useSelector((state) => state.starred)
    const dispatch = useDispatch()

  return (
    <div className="starred movies_list" data-testid="starred">
      {starredMovies && starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="row">
        {starredMovies && starredMovies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.id}
          />
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </footer>
      </div>)}

      {starredMovies && starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
