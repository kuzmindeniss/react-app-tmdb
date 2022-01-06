import React from 'react';
import { IRecommendationsTVItemProps } from './types';
import styles from './Recommendations.module.scss';
import { Link } from 'react-router-dom';

const RecommendationsMovieItem: React.FC<IRecommendationsTVItemProps> = (props: IRecommendationsTVItemProps) => {
    const id = props.item.id
    const photoSrc = props.item.backdrop_path ? `http://image.tmdb.org/t/p/w300${props.item.backdrop_path}` : process.env.REACT_APP_PHOTO_NOT_FOUND;
    const name = props.item.name;
    const href = `/tv/${id}`;

    return (
        <li className={styles.item}>
            <Link to={href} className={styles.imageWrapper}>
                <img className={styles.itemImage} src={photoSrc} alt="photo"/>
            </Link>
            <div className={styles.itemBottom}>
                <Link to={href} className={styles.itemName}>
                    { name }
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