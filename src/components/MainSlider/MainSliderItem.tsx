import styles from './MainSlider.module.scss';
import { IMainSliderItemProps } from './MainSlider.types';
import { Link } from 'react-router-dom';

const SliderItem: React.FC<IMainSliderItemProps> = (props: IMainSliderItemProps) => {
    const id = props.item.id;

    return (
        <li className={styles.imgContainer} style={{
            width: props.width
        }}>
            <div className={styles.backgroundContainer}>
                <img alt="photo" className={styles.img} src={ props.item.imageUrl } />
                <div className={styles.gradient}></div>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.title}>
                    { props.item.title }
                </span>
                <span className={styles.description}>
                    { props.item.description }
                </span>
                <div className={styles.buttons}>
                    <Link to={`/movie/${id}`} className={styles.button}>
                        Детали
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default SliderItem;