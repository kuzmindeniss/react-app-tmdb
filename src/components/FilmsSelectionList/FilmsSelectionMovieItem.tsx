import React from 'react';
import { IMovieItemProps } from './FilmsSelection.types';
import styles from './FilmsSelectionList.module.scss';
import { formatDate } from 'utils';
import { Link } from 'react-router-dom';

const MovieItem: React.FC<IMovieItemProps> = (props: IMovieItemProps) => {
    const id = props.item.id
    const photoSrc = props.item.poster_path ? `https://image.tmdb.org/t/p/w300${props.item.poster_path}` : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;

    return (
        <li className={styles.item}>
            <Link to={`/movie/${id}`} className={styles.imageWrapper}>
                <img className={styles.itemImage} src={photoSrc} alt="photo"/>
            </Link>
            <Link to={`/movie/${id}`} className={styles.itemName}>
                { props.item.title }
            </Link>
            <span className={styles.itemDate}> { formatDate(props.item.release_date) } </span>
        </li>
    )
}

export default MovieItem;