import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IDataActorWithAdditional } from "components/PersonInfo/types";
import { IPopularPeopleObject } from "components/PopularPeopleList/types";
import { RootState } from "./store";

export interface IPersonState {
	data: {
		[id: string]: IDataActorWithAdditional
	}
	popular: {
		[page: string]:  IPopularPeopleObject
	}
}

const initialState: IPersonState = {
	data: {},
	popular: {}
}


export const fetchPopularPersons = createAsyncThunk<
	{item: IPopularPeopleObject, page: string},
	string
>(
	'person/fetchPopularPersons',
	async (page) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
			"language": process.env.REACT_APP_LANGUAGE,
			"page": page || '1'
		}
		const url = `${process.env.REACT_APP_TMDB_API_URL}/3/person/popular/`;
		const response = await axios.get(url, { params });
		return {
			item: response.data as IPopularPeopleObject,
			page: page,
		};
	}
)

export const fetchPerson = createAsyncThunk<
	{item: IDataActorWithAdditional, id: string},
	string
>(
	'person/fetchPerson',
	async (id) => {
		const params = {
			"api_key": process.env.REACT_APP_TMDB_API,
			"language": process.env.REACT_APP_LANGUAGE,
			"append_to_response": "movie_credits,tv_credits,external_ids"
		}
		const url = `${process.env.REACT_APP_TMDB_API_URL}/3/person/${id}`;
		const response = await axios.get(url, { params });
		return {
			item: response.data as IDataActorWithAdditional,
			id,
		};
	}
)



export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPopularPersons.fulfilled, (state, { payload: {item, page} }) => {
			state.popular[page] = item;
		})
		builder.addCase(fetchPerson.fulfilled, (state, { payload: {item, id} }) => {
			state.data[id] = item;
		})
	}
});



export const {} = personSlice.actions;
export default personSlice.reducer;

export const getPopularPersons = (store: RootState, page: string = '1') => {
	return store.person.popular[page];
};

export const getPerson = (id:string, store: RootState) => {
	return store.person.data[id];
};
