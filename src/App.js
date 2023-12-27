import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

const App = () => {
  /**
   * Issues: Destructuring movies directly from the entire state
   * Suggestion: Destructuring only the necessary parts of the state can be more efficient
   */
  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  /**
   * Issue: VideoKey is in local state, padded during the nested components
   * Suggestion: Move videos to global state and createSelector, generate videoKey
   * and can be used in any component directly.
   */
  const [videoKey, setVideoKey] = useState()
  /**
   * Issue: Do not used state.
   * Suggestion: Remove unused state and method
   */
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  /**
   * Issue: Some unused method and state
   * Suggestion: Remove unused methods and states.
   */
  const closeModal = () => setOpen(false)

  const closeCard = () => {

  }

  const getSearchResults = (query) => {
    /**
     * Search movies can not work
     */
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  /**
   * Issue: api url spread multiple files
   *
   */
  const getMovies = () => {
    if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  /**
   * 1.Issues:  viewTrailer props passed multiple nested components
   *   Suggestion: dispatch fetchMovieById when click trailer,
   *   store the videos in global state and using createSelector to generate videoKey,
   *   do not need to pass it as props
   * @param movie
   */

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  /**
   * 1.Issues: : Backend service requests are spread across multiple files
   *   Suggestion: Consolidate backend service request logic into “services” folder.
   *               A centralized location for service requests simplifies maintenance, enhancing code readability and avoiding duplication.
   *
   * 2.Issues: API URL spread across multiple files.
   *   Suggestion: Centralized the API URL in one folder “apiUtils”. We can create a “endpoint.js” file to use a function that accepts parameters to generate the dynamic url.
   * @param id
   * @returns {Promise<void>}
   */
  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  /**
   * Issue: Missing movies dependence
   */
  useEffect(() => {
    getMovies()
  }, [])

  return (
    /**
     * Remove unused props in Header and all nested components.
     */
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          /**
           * Issue: Inline style is difficult maintain
           */
          <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
