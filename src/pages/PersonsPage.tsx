import { LayoutContent } from 'components/Layout/Layout';
import PopularPeopleList from 'components/PopularPeopleList';
import { IPopularPeopleObject } from 'components/PopularPeopleList/types';
import { useAppDispatch } from 'rdx/hooks';
import { fetchPopularPersons, getPopularPersons } from 'rdx/personSlice';
import store from 'rdx/store';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { toast } from 'react-toastify';

const PersonsPage: React.FC = () => {
	const [personsObject, setPersonsObject] = useState<IPopularPeopleObject | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const initPersonsObject = async (page: string = '1') => {
		const item = getPopularPersons(store.getState())
		const isItemsCached = item ? true : false;
		if (isItemsCached) {
            setIsLoading(false);
			setPersonsObject(item);
		} else {
			setIsLoading(true);
			const resultAction = await dispatch(fetchPopularPersons(page));
			if (fetchPopularPersons.fulfilled.match(resultAction)) {
				setPersonsObject(resultAction.payload.item);
                setIsLoading(false);
            }
            if (fetchPopularPersons.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
		}
	}
	
	useEffect(() => {
		initPersonsObject();
	}, [])

	if (isLoading) return <LayoutContent>
		<ThreeDots height="3em" fill="#06bcee" width={"100%"} />
	</LayoutContent>

	if (!personsObject) return <LayoutContent>
		<h1>Ничего не найдено</h1>
	</LayoutContent>

	return <LayoutContent>
		<PopularPeopleList popularObj={personsObject}/>
	</LayoutContent>
}

export default PersonsPage;