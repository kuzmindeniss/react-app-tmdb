import { LayoutContent } from 'components/Layout/Layout';
import PersonInfo from 'components/PersonInfo';
import { ICreditsListProps, IDataActorWithAdditional } from 'components/PersonInfo/types';
import { useAppDispatch } from 'rdx/hooks';
import { fetchPerson, getPerson } from 'rdx/personSlice';
import store from 'rdx/store';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDataActor } from 'types';

const PersonPage: React.FC = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [item, setItem] = useState<IDataActorWithAdditional | null>(null);
	const dispatch = useAppDispatch();

	const initItem = async () => {
		const item = getPerson(id || '', store.getState());
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setItem(item);
        } else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchPerson(id || ''));
			if (fetchPerson.fulfilled.match(resultAction)) {
				setItem(resultAction.payload.item);
                setIsLoading(false);
            }
            if (fetchPerson.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
		}
	}

	useEffect(() => {
		console.log(item);
	})

	useEffect(() => {
		initItem();
	}, [id])

	if (isLoading) return <LayoutContent>
		<ThreeDots height="3em" fill="#06bcee" width={"100%"} />
	</LayoutContent>

	if (!item) return <LayoutContent>
		<h1>Ничего не найдено</h1>
	</LayoutContent>

	return <LayoutContent>
		<PersonInfo item={item} tvCredits={item.tv_credits} movieCredits={item.movie_credits}/>
	</LayoutContent>
}

export default PersonPage;