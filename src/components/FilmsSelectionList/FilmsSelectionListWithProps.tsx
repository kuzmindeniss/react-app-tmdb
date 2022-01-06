import React from 'react';
import styles from './FilmsSelectionList.module.scss';
import { IFilmsListWithPropsProps } from './FilmsSelection.types';
import ListUl from './FilmsSelectionListUl';


const FilmsSelectionListWithProps: React.FC<IFilmsListWithPropsProps> = (props: IFilmsListWithPropsProps) => {

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