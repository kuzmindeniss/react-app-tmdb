import React, { useRef, useState } from 'react';
import { ContentTypes } from 'types';
import { IFilmsSearchList, SearchListSlugs } from './FilmsSearch.types';
import ListUl from './FilmsSearchListUl';
import styles from './FilmsSearchList.module.scss'
import { Transition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { useEffect } from 'react';
import { fetchSearchMovies, fetchSearchTVs, getSearchItems } from 'rdx/searchSlice';
import { useAppDispatch } from 'rdx/hooks';
import { toast } from 'react-toastify';
import store from 'rdx/store';
import { useSearchParams } from 'react-router-dom';
import { ThreeDots } from 'react-loading-icons';

const FilmsSearch: React.FC<IFilmsSearchList> = (props: IFilmsSearchList) => {
    // const router = useRouter();
    const listRef = useRef();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentSlug, setCurrentSlug] = useState<ContentTypes>('movie');
    const [searchParams, setSearchParams] = useSearchParams();
    
    const dispatch = useAppDispatch();

    const setMovies = async (query?: string, e?: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentSlug('movie');
        const queryStr = query || searchParams.get("q") || '';
        const items = getSearchItems('movie', queryStr, store.getState());
        const isItemsCached = items[0] ? true : false;

        if (isItemsCached) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const resultAction = await dispatch(fetchSearchMovies(queryStr || 'a'));
            if (fetchSearchMovies.fulfilled.match(resultAction)) {
                setIsLoading(false);
            }
            if (fetchSearchMovies.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
        }
    }
    
    const setTvShows = async (query?: string, e?: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentSlug('tv');
        const queryStr = query || searchParams.get("q") || '';
        const items = getSearchItems('tv', queryStr, store.getState());
        const isItemsCached = items[0] ? true : false;

        if (isItemsCached) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const resultAction = await dispatch(fetchSearchTVs(queryStr || 'a'));
            if (fetchSearchTVs.fulfilled.match(resultAction)) {
                setIsLoading(false);
            }
            if (fetchSearchTVs.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
        }
    }

    const getItems = () => {
        // console.log(getSearchItems(currentSlug, searchParams.get("q") || '', store.getState()));
        return getSearchItems(currentSlug, searchParams.get("q") || '', store.getState());
    }

    const selectionsData: {
        [key in SearchListSlugs]: {
            title: string
            action: (slug?: string, e?: React.MouseEvent<HTMLButtonElement>) => void
        }
    } = {
        "movie": {
            title: "Фильмы",
            action: setMovies,
        },
        "tv": {
            title: "Серилы",
            action: setTvShows,
        }
    }

    const getSelections = (): JSX.Element[] => {
        const items = [];
        for (const key in selectionsData) {
            const item = selectionsData[key as SearchListSlugs];
            items.push(
                <li className={styles.selectionItem} key={key}>
                    <button
                        className={classNames(styles.selectionButton, {
                            [styles.selectionButtonActive]: key === currentSlug
                        })} onClick={() => item.action()}
                    >{ item.title }</button>
                </li>
            )
        }
        return items;
    }

    const animationDuration = 300;

    useEffect(() => {
        selectionsData[currentSlug].action();
    }, [searchParams.get("q")])

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.selection}>
                    <div className={styles.selectionHeader}>
                        Результаты поиска
                    </div>
                    <ul className={styles.selectionList}>
                        { getSelections() }
                    </ul>
                </div>
            </div>
            <div className={styles.rightContainer}>
                {isLoading && <ThreeDots height="3em" fill="#06bcee" width={"100%"} />}
                <TransitionGroup>
                    <Transition
                        key={`${currentSlug} ${searchParams.get("q")}`}
                        timeout={animationDuration}
                        nodeRef={listRef}
                    >
                        {state => {
                            return <ListUl isLoading={isLoading} type={currentSlug} data={getItems()} animationDuration={animationDuration} animationState={state}/>
                        }}
                    </Transition>
                </TransitionGroup>
            </div>
        </div>
    )
}

export default FilmsSearch;