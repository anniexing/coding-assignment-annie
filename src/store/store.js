import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from './moviesSlice'
import starredReducer from './starredSlice'
import watchLaterReducer from './watchLaterSlice'
import modalReducer from './modalSlice';
import moviesAPI from './moviesAPI';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        starred: starredReducer,
        watchLater: watchLaterReducer,
        modal: modalReducer,
        [moviesAPI.reducerPath]: moviesAPI.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(moviesAPI.middleware)
})

export default store
