import { createSearchParams, Link, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import {debounce} from 'lodash';
import useFetchMovies from '../hooks/useFetchMovies';

import '../styles/header.scss'

const Header = () => {
  const navigate = useNavigate();
  const { starredMovies } = useSelector((state) => state.starred)
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchMovies} = useFetchMovies({searchQuery: ""})

  /**
   * Issue: did not use debounce for search movie
   * Suggestion: Consider using a debounce function,avoid making too many requests as the user types rapidly
   */

  const handleKeyUP = debounce((e) => {
   const value =e?.target.value;
    searchMovies(value);
  },500)

  const getSearchResults = (query) => {
    /**
     * Search movies can not work
     */
    console.log("query:"+query);
    if (query !== '') {
      fetchMovies({searchQuery:query})
      //setSearchParams(createSearchParams({ search: query }))
    } else {
      fetchMovies({page:1})
      //setSearchParams(" ")
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }


  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies && starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>
      <div className="input-group rounded">
        <Link to="/" onClick={(e) => handleKeyUP(e)} className="search-link" >
          <input type="search" data-testid="search-movies"
            onKeyUp={(e) => handleKeyUP(e)}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
            />
        </Link>
      </div>
    </header>
  )
}

export default Header
