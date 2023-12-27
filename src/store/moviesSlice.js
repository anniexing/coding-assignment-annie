import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMovieByMovieIdFromApi} from '../services/movies';


export const fetchMovieById = createAsyncThunk('movies/fetch-movie-by-id', async (apiUrl,_) => {
    return getMovieByMovieIdFromApi(apiUrl);
})

const initialState = {
    movies:[],
    videos: {},
    fetchMovieByIdStatus:"",
    requestId: '',
    isFetching: false,
    isError:false,
    isSuccess: false,

}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateMovies:(state, action) => {
            const { requestId, data, args } = action.payload;
            if(state.requestId === requestId) {
                return {
                    ...state,
                    ...args,
                    movies:[...state.movies,...data.results],
                    isFetching:true
                }
            }
            return state;
        },
        updateIsFetching:(state, action) => {
            return {
                ...state,
                ...action.payload,
                isFetching: true,
                isError:false,
                isSuccess:false,
            }
        },
        updateIsError:(state, action) => {
            const { requestId} = action.payload;
            if(state.requestId === requestId) {
                return {
                    ...state,
                    ...action.payload,
                    isFetching:false,
                    isSuccess: false,
                    isError: true
                }
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            state.videos = action.payload;
            state.fetchMovieByIdStatus = 'success'
        }).addCase(fetchMovieById.pending, (state, action) => {
            state.fetchMovieByIdStatus = 'loading'
        }).addCase(fetchMovieById.rejected, (state, action) => {
            state.fetchMovieByIdStatus = 'failed';
        })
    }
})

export const { updateMovies, updateIsError, updateIsFetching} = moviesSlice.actions;
export default moviesSlice.reducer
