import React, { useEffect, useRef, useState } from 'react';
import styles from './FilmsSelectionList.module.scss';
import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from 'types';
import { IFilmsListProps, FilmsListSelectionType, IFilmsListWithPropsProps } from './FilmsSelection.types';
import ListUl from './FilmsSelectionListUl';
import { TransitionGroup, Transition } from 'react-transition-group';
import classNames from 'classnames';
import axios from 'axios';
import { useAppDispatch } from 'rdx/hooks';
import { fetchTVsPopularForRent, fetchTVsPopularOnline, fetchTVsPopularOnTV, getTVs } from 'rdx/filmsSelectionSlice';
import { toast } from 'react-toastify';
import { AsyncThunk } from '@reduxjs/toolkit';
import store from 'rdx/store';
import { ThreeDots } from 'react-loading-icons';


const FilmsSelectionListWithProps: React.FC<IFilmsListWithPropsProps> = (props: IFilmsListWithPropsProps) => {
    useEffect(() => {
    }, []);

    return (
        <div className={styles.filmsListContainer}>
            <span className={styles.listName}>
                Что популярно
            </span>
            <div className={styles.listContainer}>
                <ListUl data={props.data} type={props.type}/>
            </div> 
        </div>
    );
}

export default FilmsSelectionListWithProps;