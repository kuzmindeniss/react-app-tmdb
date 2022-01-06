import React, { useEffect, useRef, useState } from 'react';
import styles from './FilmsSelectionList.module.scss';
import { ContentDataType, IDataTV } from 'types';
import { IFilmsListProps, FilmsListSelectionType } from './FilmsSelection.types';
import ListUl from './FilmsSelectionListUl';
import { TransitionGroup, Transition } from 'react-transition-group';
import classNames from 'classnames';
import { useAppDispatch } from 'rdx/hooks';
import { fetchTVsPopularForRent, fetchTVsPopularOnline, fetchTVsPopularOnTV, getTVs } from 'rdx/filmsSelectionSlice';
import { toast } from 'react-toastify';
import { AsyncThunk } from '@reduxjs/toolkit';
import store from 'rdx/store';
import { ThreeDots } from 'react-loading-icons';


const FilmsSelectionList: React.FC<IFilmsListProps> = (props: IFilmsListProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentSlug, setCurrentSlug] = useState<FilmsListSelectionType | null>(null);
    const [, setStateForRerender] = useState({});

    const listRef = useRef();
    const selectionBgState = useRef({
        left: 0,
        width: 0,
    });
    const firstSelectionNodeRef = useRef<HTMLButtonElement>(null);

    const dispatch = useAppDispatch();

    const setData = async (slug: FilmsListSelectionType, e?: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentSlug(slug);
        const items =  getItems(slug);

        if (!items){
            setIsLoading(true);
            const resultAction = await dispatch(selectionsData[slug].thunkAction());

            if (selectionsData[slug].thunkAction.fulfilled.match(resultAction)) {
                setIsLoading(false);
            }
            if (selectionsData[slug].thunkAction.rejected.match(resultAction)) {
                setIsLoading(false);
                toast.error(resultAction.error.message);
            }
        }
        if (e) setSelectionBg(e.target as HTMLElement);
    }

    const selectionsData: {
        [key in FilmsListSelectionType]: {
            title: string
            thunkAction: AsyncThunk<IDataTV[], void, {}>
        }
    } = {
        "tvs-popular-forrent": {
            title: "Напрокат",
            thunkAction: fetchTVsPopularForRent
        },
        "tvs-popular-online": {
            title: "Онлайн",
            thunkAction: fetchTVsPopularOnline
        },
        "tvs-popular-ontv": {
            title: "По тв",
            thunkAction: fetchTVsPopularOnTV
        },
    }

    const setSelectionBg = (el: HTMLElement, isInit: boolean = false): void => {
        const width = getComputedStyle(el).getPropertyValue("width");
        let left = el.offsetLeft;
        if (isInit) left = 0;
        selectionBgState.current = {
            width: parseFloat(width),
            left,
        }
        setStateForRerender({});
    }

    const getSelections = (data: typeof props.selectionTypes): JSX.Element[] | null => {
        if (!data) return null;

        const items:JSX.Element[] = data.map((slug, idx) => {
            const item = selectionsData[slug];
            return (
                <li className={classNames(styles.listSelectionItem, {
                    [styles.listSelectionItemActive]: slug === currentSlug
                })} key={idx}>
                    <button ref={idx === 0 ? firstSelectionNodeRef : undefined} className={styles.listSelectionItemButton} onClick={(e) => {setData(slug, e)}}>{ item.title }</button>
                </li>
            )
        })

        return items;
    }

    const animationDuration = 200;

    const getItems = (slug?: FilmsListSelectionType): Array<ContentDataType> | undefined => {
        if (slug) {
            const items = getTVs(slug, store.getState());
            return items;
        }

        if (!currentSlug) return;
        const items = getTVs(currentSlug, store.getState());
        return items;
    }

    useEffect(() => {
        setData(props.selectionTypes[0]);
        if (!firstSelectionNodeRef.current) return;
        setSelectionBg(firstSelectionNodeRef.current as HTMLElement, true);
    }, []);

    return (
        <div className={styles.filmsListContainer}>
            <span className={styles.listName}>
                Что популярно
            </span>
            {props.selectionTypes && (
                <div className={styles.listSelectionContainer}>
                    <div className={styles.listSelectionBg}
                        style={{
                            width: selectionBgState.current.width,
                            left: selectionBgState.current.left,
                        }}
                    ></div>
                    <ul className={styles.listSelection}>
                        { getSelections(props.selectionTypes) }
                    </ul>
                    {isLoading && <ThreeDots height="1.2em" fill="#06bcee" width={"40px"} />}
                </div>
            )}
            <div className={styles.listContainer}>
                <TransitionGroup>
                    <Transition
                        key={currentSlug}
                        timeout={animationDuration}
                        nodeRef={listRef}
                    >
                        {state => {
                            return <ListUl data={getItems()} type="tv" ref={listRef} animationState={state} animationDuration={animationDuration} />
                        }}
                    </Transition>
                </TransitionGroup>
            </div> 
        </div>
    );
}

export default FilmsSelectionList;