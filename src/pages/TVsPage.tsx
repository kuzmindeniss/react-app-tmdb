import { LayoutContent } from 'components/Layout/Layout';
import PopularFilmsList from 'components/PopularFilmsList';
import { IPopularTVsObject } from 'components/PopularFilmsList/types';
import { fetchPopularFilms, getPopularFilms } from 'rdx/filmSlice';
import { useAppDispatch } from 'rdx/hooks';
import store from 'rdx/store';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { toast } from 'react-toastify';

const TVsPage: React.FC = () => {
	const [TVsObject, setTVsObject] = useState<IPopularTVsObject | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const iniTVsObject = async (page: string = '1') => {
		const item = getPopularFilms('tv', store.getState()) as IPopularTVsObject | null;
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setTVsObject(item);
		} else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchPopularFilms({type: 'tv', page}));
			if (fetchPopularFilms.fulfilled.match(resultAction)) {
				setTVsObject(resultAction.payload.item as IPopularTVsObject);
                setIsLoading(false);
            }
            if (fetchPopularFilms.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
		}
	}

	useEffect(() => {
		iniTVsObject();
	}, [])

	if (isLoading) return <LayoutContent>
		<ThreeDots height="3em" fill="#06bcee" width={"100%"} />
	</LayoutContent>

	if (!TVsObject) return <LayoutContent>
		<h1>Ничего не найдено</h1>
	</LayoutContent>

	return <LayoutContent>
		<PopularFilmsList filmsObj={TVsObject} type="tv" />
	</LayoutContent>
}

export default TVsPage;