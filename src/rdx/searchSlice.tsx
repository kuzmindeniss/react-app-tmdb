import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from './store';
import { IDataMovie, IDataTV, ContentTypes } from 'types';

export interface ISearchState {
	data: {
		tv: { [query: string]: IDataTV[] }
		movie: { [query: string]: IDataMovie[] }
	}
}

export const fetchSearchMovies = createAsyncThunk<
	{newData: Array<IDataMovie>, query: string},
	string
>(
	'search/fetchSearchMovies',
	async (query: string) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
			query: query || ''
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/search/movie";
		const response = await axios.get(url, { params });
		return {newData: response.data.results, query};
	}
);

export const fetchSearchTVs = createAsyncThunk<
	{newData: Array<IDataTV>, query: string},
	string
>(
	'search/fetchSearchTVs',
	async (query: string) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
			query: query || ''
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/search/tv";
		const response = await axios.get(url, { params });
		return {newData: response.data.results, query};
	}
);

const initialState: ISearchState = {
	data: {
		tv: {},
		movie: {},
	}
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSearchMovies.fulfilled, (state, { payload: {query, newData} }) => {
			state.data.movie[query] = newData;
		})
		builder.addCase(fetchSearchTVs.fulfilled, (state, { payload: {query, newData} }) => {
			state.data.tv[query] = newData;
		})
	}
});


export const {  } = searchSlice.actions;
export default searchSlice.reducer;


export const getSearchItems = (type: ContentTypes, query: string, store: RootState) => {
	return store.search.data[type][query] || [];
};