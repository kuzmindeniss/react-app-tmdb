import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FilmsListSelectionType } from "components/FilmsSelectionList/FilmsSelection.types";
import { ContentDataType, IDataTV } from "types";
import { RootState } from './store';

export interface IFilmsSelectionState {
	data: {
		[key in FilmsListSelectionType]?: Array<ContentDataType>
	}
}


const initialState: IFilmsSelectionState = {
	data: {}
}

export const fetchTVsPopularOnline = createAsyncThunk<
	Array<IDataTV>
>(
	'filmsSelection/fetchTVsPopularOnline',
	async () => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/tv/top_rated";
		const response = await axios.get(url, { params });
		return response.data.results as IDataTV[];
	}
);

export const fetchTVsPopularForRent = createAsyncThunk<
	Array<IDataTV>
>(
	'filmsSelection/fetchTVsPopularForRsent',
	async () => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/tv/airing_today";
		const response = await axios.get(url, { params });
		return response.data.results as IDataTV[];
	}
);

export const fetchTVsPopularOnTV = createAsyncThunk<
	Array<IDataTV>
>(
	'filmsSelection/fetchTVsPopularOnTV',
	async () => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
    		"language": process.env.REACT_APP_LANGUAGE,
		}
		const url = process.env.REACT_APP_TMDB_API_URL + "/3/tv/popular";
		const response = await axios.get(url, { params });
		return response.data.results as IDataTV[];
	}
);


export const filmsSelectionSlice = createSlice({
    name: 'filmsSelection',
    initialState,
    reducers: {
		setData: (state: IFilmsSelectionState, action: PayloadAction<{newData: Array<ContentDataType>, slug: FilmsListSelectionType}>) => {
			state.data[action.payload.slug] = action.payload.newData;
			return state;
		}
    },
	extraReducers: (builder) => {
		builder.addCase(fetchTVsPopularOnline.fulfilled, (state, {payload}) => {
			state.data["tvs-popular-online"] = payload;
		})
		builder.addCase(fetchTVsPopularOnTV.fulfilled, (state, {payload}) => {
			state.data["tvs-popular-ontv"] = payload;
		})
		builder.addCase(fetchTVsPopularForRent.fulfilled, (state, {payload}) => {
			state.data["tvs-popular-forrent"] = payload;
		})
	}
});

export const { setData } = filmsSelectionSlice.actions;
export default filmsSelectionSlice.reducer;

export const getTVs = (slug: FilmsListSelectionType, store: RootState) => store.filmsSelection.data[slug];