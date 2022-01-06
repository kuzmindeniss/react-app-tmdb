import { configureStore } from '@reduxjs/toolkit'
import filmsSelectionReducer from './filmsSelectionSlice';
import searchReducer from './searchSlice';
import filmReducer from './filmSlice';
import personReducer from './personSlice';

export const store = configureStore({
    reducer: {
        filmsSelection: filmsSelectionReducer,
        search: searchReducer,
        film: filmReducer,
        person: personReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;