import styles from './Recommendations.module.scss';
import { IRecommendationsListProps } from "./types";
import RecommendationsItem from "./RecommendationsItem";
import { IDataMovie } from 'types';

const RecommendationsList: React.FC<IRecommendationsListProps> = (props: IRecommendationsListProps) => {
    const getItems = (): JSX.Element[] => {
        if (!props.data) return [];

        const items = props.data.map((item, idx) => {
            return <RecommendationsItem item={item as IDataMovie} key={item.id} type={props.type}/>
        });

        return items;
    }

    if (!props.data[0]) return null;    

    return (
        <div className={styles.container}>
            <div className={styles.listName}>Рекомендации</div>
            <ul className={styles.list}>
                { getItems() }
            </ul>
        </div>
    )
}

export default RecommendationsList;