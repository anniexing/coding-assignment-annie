import starredReducer, {starMovie, unstarMovie, clearAllStarred} from '../store/starredSlice'
import { moviesMock } from './movies.mocks'

describe('starredSlice test', () => {

    const state = { starredMovies: [] }

    it('should set an initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = starredReducer(initialState, action)
        expect(result).toEqual({ starredMovies: []})
      })

      it('should add movie to starred', () => {
        const initialState = { ...state, starredMovies: [] }
        const action = starMovie(moviesMock[0])
        const result = starredReducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[0])
      })

      it('should remove movie from starred', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = unstarMovie(moviesMock[0])
        const result = starredReducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[1])
      })

      it('should remove all movies', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = clearAllStarred(state)
        const result = starredReducer(initialState, action)
        expect(Object.keys(result.starredMovies).length).toEqual(0)
      })
})
