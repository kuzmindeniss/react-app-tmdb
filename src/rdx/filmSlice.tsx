import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from './store';
import { ContentTypes, IDataDetailedMovie, IDataDetailedTV } from 'types';
import { IPopularFilmsObject, IPopularMoviesObject, IPopularTVsObject } from "components/PopularFilmsList/types";

export interface IFilmState {
	data: {
		tv: { [id: string]: IDataDetailedTV }
		movie: { [id: string]: IDataDetailedMovie }
	}
	popular: {
		tv: { [page: string]:  IPopularTVsObject}
		movie: { [page: string]:  IPopularMoviesObject}
	}
}

const initialState: IFilmState = {
	data: {
		tv: {},
		movie: {},
	},
	popular: {
		tv: {},
		movie: {},
	}
}

export const fetchMovie = createAsyncThunk<
	{newData: IDataDetailedMovie, id: string},
	string
>(
	'film/fetchMovie',
	async (id: string) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
			"append_to_response": "recommendations,similar"
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/movie/" + id;
		const response = await axios.get(url, { params });
		console.log(response.data);
		return {
			newData: response.data as IDataDetailedMovie,
			id
		};
	}
)

export const fetchTV = createAsyncThunk<
	{newData: IDataDetailedTV, id: string},
	string
>(
	'film/fetchTV',
	async (id: string) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
			"append_to_response": "recommendations,similar"
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/tv/" + id;
		const response = await axios.get(url, { params });
		return {
			newData: response.data as IDataDetailedTV,
			id
		};
	}
)

export const fetchPopularFilms = createAsyncThunk<
	{item: IPopularFilmsObject, type: ContentTypes, page: string},
	{type: ContentTypes, page: string}
>(
	'film/fetchPopular',
	async (props) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
			"language": process.env.REACT_APP_LANGUAGE,
			"page": props.page || '1'
		}
		const url = `${process.env.REACT_APP_TMDB_API_URL}/3/${props.type}/popular/`;
		const response = await axios.get(url, { params });
		return {
			item: response.data as IPopularFilmsObject,
			page: props.page,
			type: props.type
		};
	}
)



export const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovie.fulfilled, (state, { payload: {id, newData} }) => {
			state.data.movie[id] = newData;
		})
		builder.addCase(fetchTV.fulfilled, (state, { payload: {id, newData} }) => {
			state.data.tv[id] = newData;
		})
		builder.addCase(fetchPopularFilms.fulfilled, (state, { payload: {item, page, type} }) => {
			state.popular[type][page] = item;
		})
	}
});


export const {} = filmSlice.actions;
export default filmSlice.reducer;

export const getFilmItem = (type: ContentTypes, id: string, store: RootState) => {
	return store.film.data[type][id];
};

export const getPopularFilms = (type: ContentTypes, store: RootState, page: string = '1') => {
	return store.film.popular[type][page];
}