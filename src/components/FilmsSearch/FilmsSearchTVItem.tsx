import React from 'react';
import styles from './FilmsSearchList.module.scss';
import { formatDate } from 'utils';
import { IFilmsSearchMovieItemProps, IFilmsSearchTVItemProps } from './FilmsSearch.types';
import { Link } from 'react-router-dom';

const TVItem: React.FC<IFilmsSearchTVItemProps> = (props: IFilmsSearchTVItemProps) => {
    const name = props.item.name || "";
    const imgPath = props.item.poster_path ? "http://image.tmdb.org/t/p/w154" + props.item.poster_path : process.env.REACT_APP_PHOTO_NOT_FOUND;
    const releaseDate = props.item.first_air_date ? formatDate(props.item.first_air_date) : "";
    const overview = props.item.overview || "";
    const alt = props.item.original_name || "";
    const id = props.item.id;

    return (
        <li className={styles.item}>
            <Link to={`/tv/${id}`} className={styles.imgWrapper}>
                <img
                    src={imgPath}
                    alt={alt}
                    className={styles.img}
                />
            </Link>
            <div className={styles.itemInfo}>
                <Link to={`/tv/${id}`} className={styles.itemName}>
                    { name }
                </Link>
                <span className={styles.itemDate}>
                    { releaseDate }
                </span>
                {overview && (
                    <div className={styles.itemPreview}>
                        <p>{ overview }</p>
                    </div>
                )}
            </div>
        </li>
    )
}

export default TVItem;