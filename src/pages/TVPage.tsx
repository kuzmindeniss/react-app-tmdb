import FilmsSelectionList from 'components/FilmsSelectionList/FilmsSelection';
import FilmsSelectionListWithProps from 'components/FilmsSelectionList/FilmsSelectionListWithProps';
import { LayoutContent } from 'components/Layout/Layout';
import RecommendationsList from 'components/RecommendationsList';
import MovieReview from 'components/Review/Movie';
import TVReview from 'components/Review/TV';
import { fetchMovie, fetchTV, getFilmItem } from 'rdx/filmSlice';
import { useAppDispatch } from 'rdx/hooks';
import store from 'rdx/store';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDataDetailedMovie, IDataDetailedTV } from 'types';

const TVPage: React.FC = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const [item, setItem] = useState<IDataDetailedTV | null>(null);

	const initItem = async () => {
		const item = getFilmItem('tv', id || '', store.getState());
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setItem(item as IDataDetailedTV);
        } else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchTV(id || ''));
			if (fetchTV.fulfilled.match(resultAction)) {
				setItem(resultAction.payload.newData);
                setIsLoading(false);
            }
            if (fetchTV.rejected.match(resultAction)) {
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
		<h1>Такого cериала не найдено</h1>
	</LayoutContent>

	return <>
		<TVReview item={item}/>
		<LayoutContent>
			{item.recommendations && <RecommendationsList type="tv" data={item.recommendations.results}/>}
			{item.similar && <FilmsSelectionListWithProps type="tv" data={item.similar.results}/>}
		</LayoutContent>
	</>
}

export default TVPage;