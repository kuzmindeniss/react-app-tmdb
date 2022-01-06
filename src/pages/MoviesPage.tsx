import { LayoutContent } from 'components/Layout/Layout';
import PopularFilmsList from 'components/PopularFilmsList';
import { IPopularMoviesObject } from 'components/PopularFilmsList/types';
import { fetchPopularFilms, getPopularFilms } from 'rdx/filmSlice';
import { useAppDispatch } from 'rdx/hooks';
import store from 'rdx/store';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { toast } from 'react-toastify';

const MoviesPage: React.FC = () => {
	const [moviesObject, setMoviesObject] = useState<IPopularMoviesObject | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const initMoviesObject = async (page: string = '1') => {
		const item = getPopularFilms('movie', store.getState()) as IPopularMoviesObject | null;
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setMoviesObject(item);
		} else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchPopularFilms({type: 'movie', page}));
			if (fetchPopularFilms.fulfilled.match(resultAction)) {
				setMoviesObject(resultAction.payload.item as IPopularMoviesObject);
                setIsLoading(false);
            }
            if (fetchPopularFilms.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
		}
	}

	useEffect(() => {
		initMoviesObject();
	}, [])

	if (isLoading) return <LayoutContent>
		<ThreeDots height="3em" fill="#06bcee" width={"100%"} />
	</LayoutContent>

	if (!moviesObject) return <LayoutContent>
		<h1>Ничего не найдено</h1>
	</LayoutContent>

	return <LayoutContent>
		<PopularFilmsList filmsObj={moviesObject} type="movie" />
	</LayoutContent>
}

export default MoviesPage;