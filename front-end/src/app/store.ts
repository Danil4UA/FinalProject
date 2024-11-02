import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/state/postSlice"

const rootReducer = combineReducers({
    posts: postsReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch; 
export default store