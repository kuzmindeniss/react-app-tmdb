import React from 'react';
import styles from './Review.module.scss';
import { IMovieReviewProps } from './types';
import UserChart from 'components/UserChart';

const MovieReview: React.FC<IMovieReviewProps> = (props: IMovieReviewProps) => {
    if (!props.item) {
        return null;
    }
    
    const name = props.item.title;
    const year = props.item.release_date.slice(0, 4);
    const genresTitlesArr = props.item.genres.map(genre => {
        return genre.name;
    });
    const genresTitlesString = genresTitlesArr.join(', ');
    const date = props.item.release_date;
    const percentAverage = props.item.vote_average * 10;
    const overview = props.item.overview;
    const imgPath = props.item.poster_path ? "http://image.tmdb.org/t/p/w300" + props.item.poster_path : process.env.REACT_APP_PHOTO_NOT_FOUND;
    const bgPath = "http://image.tmdb.org/t/p/original" + props.item.backdrop_path;
   
    let runTimeHours: string;
    let runTimeMinutes: string;
    if (props.item.runtime) {
        runTimeHours = Math.floor(props.item.runtime / 60) + 'h';
        runTimeMinutes = props.item.runtime - (parseInt(runTimeHours) * 60) + 'm';
    }
    const runTime = props.item.runtime ? `${runTimeHours!} ${runTimeMinutes!}` : null;

    return (
        <div 
            className={styles.container}
            style={{
                backgroundImage: `url("${bgPath}")`
            }}
        >
            <div className={styles.containerBg}>
                <div className={styles.contentContainer}>
                    <div className={styles.containerLeft}>
                        <div className={styles.imgWrapper}>
                            <img
                                src={imgPath}
                                placeholder="blur"
                                alt="photo"
                            />
                        </div>
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.infoTop}>
                            <span className={styles.filmName}>{ name }</span>
                            <span className={styles.filmYear}> ({ year })</span>
                        </div>
                        <div className={styles.infoFacts}>
                            <span className={styles.infoDate}>{ date }</span>
                            <span className={styles.infoGenres}>{ genresTitlesString }</span>   
                            <span className={styles.infoRuntime}>{ runTime }</span>
                        </div>
                        <UserChart percent={percentAverage}/>
                        {overview && 
                            <div className={styles.preview}>
                                <span className={styles.previewTitle}>Обзор</span>
                                <p className={styles.previewText}>{ overview }</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieReview;