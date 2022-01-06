import React from 'react';
import { IRecommendationsMovieItemProps } from './types';
import styles from './Recommendations.module.scss';
import { formatDate } from 'utils';
import { Link } from 'react-router-dom';

const RecommendationsMovieItem: React.FC<IRecommendationsMovieItemProps> = (props: IRecommendationsMovieItemProps) => {
    const id = props.item.id
    const photoSrc = props.item.backdrop_path ? `http://image.tmdb.org/t/p/w300${props.item.backdrop_path}` : process.env.REACT_APP_PHOTO_NOT_FOUND;

    return (
        <li className={styles.item}>
            <Link to={`/movie/${id}`} className={styles.imageWrapper}>
                <img className={styles.itemImage} src={photoSrc} alt="photo"/>
            </Link>
            <div className={styles.itemBottom}>
                <Link to={`/movie/${id}`} className={styles.itemName}>
                    { props.item.title }
                </Link>
                <span className={styles.itemPercent}>
                    {Math.floor(props.item.vote_average * 10)} %
                </span>
            </div>
            {/* <span className={styles.itemDate}> { formatDate(props.item.release_date) } </span> */}
        </li>
    )
}

export default RecommendationsMovieItem;