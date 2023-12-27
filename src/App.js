import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/common/YoutubePlayer'
import './app.scss'
import useFetchMovies from './hooks/useFetchMovies';
import {selectedTrailerVideo} from './selectors/videoTrailerSelector';
import Modal from "./components/common/Modal";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { videoKeyTest} = (useSelector(state => selectedTrailerVideo(state, "Trailer")))
  const navigate = useNavigate();
  const [requestParams, setRequestParams] = useState({
    page: 1
  });
  const { fetchMovies } = useFetchMovies(requestParams);
  const {isFetching} = useSelector(state => state.movies);

  useEffect(() => {
    const handleOnScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollToBottom = scrollableHeight-window.scrollY;
      if (scrollToBottom && isFetching){
        setRequestParams((prevState) => ({...prevState, page: prevState.page + 1}));
        fetchMovies({ page: requestParams.page + 1 });
      }
    }

    document.addEventListener("scroll", handleOnScroll)
    return function(){
      document.removeEventListener("scroll", handleOnScroll);
    }
  }, [requestParams, isFetching]);


  const getSearchResults = (query) => {
    /**
     * Search movies can not work
     */
    if (query !== '') {
      fetchMovies({searchQuery:query})
      setSearchParams(createSearchParams({ search: query }))
    } else {
      fetchMovies({page: requestParams.page + 1})
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }


  return (
    /**
     * Remove unused props in Header and all nested components.
     */
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred  />} />
          <Route path="/watch-later" element={<WatchLater  />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
      <Modal>
        <div className="video-wrapper">
          {videoKeyTest ? (
            <YouTubePlayer
              videoKey={videoKeyTest}
            />
          ) : (
            <div style={{ padding: "30px" }}><h6>no trailer available. Try another movie</h6></div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default App
