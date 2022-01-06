import React from 'react';
import { ITVItemProps } from './FilmsSelection.types';
import styles from './FilmsSelectionList.module.scss';
import { formatDate } from 'utils';
import { Link } from 'react-router-dom';

const TVItem: React.FC<ITVItemProps> = (props: ITVItemProps) => {
    const id = props.item.id;
    const photoSrc = props.item.poster_path ? `https://image.tmdb.org/t/p/w300${props.item.poster_path}` : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;

    return (
        <li className={styles.item}>
            <Link to={`/tv/${id}`} className={styles.imageWrapper}>
                <img className={styles.itemImage} src={photoSrc} alt="photo"/>
            </Link>
            <Link to={`/tv/${id}`} className={styles.itemName}>
                { props.item.name }
            </Link>
            <span className={styles.itemDate}> { formatDate(props.item.first_air_date) } </span>
        </li>
    )
}

export default TVItem;