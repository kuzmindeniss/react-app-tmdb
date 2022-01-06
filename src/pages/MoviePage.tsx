import FilmsSelectionListWithProps from 'components/FilmsSelectionList/FilmsSelectionListWithProps';
import { LayoutContent } from 'components/Layout/Layout';
import RecommendationsList from 'components/RecommendationsList';
import MovieReview from 'components/Review/Movie';
import { fetchMovie, getFilmItem } from 'rdx/filmSlice';
import { useAppDispatch } from 'rdx/hooks';
import store from 'rdx/store';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDataDetailedMovie } from 'types';

const TVPage: React.FC = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const [item, setItem] = useState<IDataDetailedMovie | null>(null);

	const initItem = async () => {
		const item = getFilmItem('movie', id || '', store.getState());
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setItem(item as IDataDetailedMovie);
        } else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchMovie(id || ''));
			if (fetchMovie.fulfilled.match(resultAction)) {
				setItem(resultAction.payload.newData);
                setIsLoading(false);
            }
            if (fetchMovie.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
		}
	}

	useEffect(() => {
		initItem();
	}, [id]);

	if (isLoading) return <LayoutContent>
		<ThreeDots height="3em" fill="#06bcee" width={"100%"} />
	</LayoutContent>

	if (!item) return <LayoutContent>
		<h1>Такого фильма не найдено</h1>
	</LayoutContent>

	return <>
		<MovieReview item={item}/>
		<LayoutContent>
			{item.recommendations && <RecommendationsList type="movie" data={item.recommendations.results}/>}
			{item.similar && <FilmsSelectionListWithProps data={item.similar.results} type="movie"/>}
		</LayoutContent>
	</>
}

export default TVPage;