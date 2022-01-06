import { IPopularPeopleListProps, IPopularPeopleObject, IPopularPeopleResultItem } from "./types";
import styles from "./PopularPeopleList.module.scss";
import { Link } from "react-router-dom";
import { IDataMovie, IDataTV } from "types";

const PopularPeopleList: React.FC<IPopularPeopleListProps> = (props: IPopularPeopleListProps) => {
    const items = props.popularObj.results;
    const totalPages = props.popularObj.total_pages;
    const totalResults = props.popularObj.total_results;
    const page = props.popularObj.page;

    const getLis = (): JSX.Element[] => {
        const lis = items.map((item, idx) => {
            const imgPath = item.profile_path ? "http://image.tmdb.org/t/p/w235_and_h235_face/" +  item.profile_path : process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
            const id = item.id;
            const knownForArray: Array<IDataMovie | IDataTV> = item.known_for;
            const knownForNames: string = knownForArray.map(item => {
                if ((item as IDataMovie).title) return (item as IDataMovie).title;
                if ((item as IDataTV).name) return (item as IDataTV).name;
            }).join(', ');

            return <li key={id} className={styles.item}>
                <Link to={`/person/${id}`} className={styles.imageWrapper}>
                    <img src={imgPath} alt="photo"/>
                </Link>
                <Link to={`/person/${id}`} className={styles.name}>
                    { item.name }
                </Link>
                <span className={styles.knownFor}>{ knownForNames }</span>
            </li>
        })
        return lis;
    }

    return <div className={styles.container}>
        <h1>Популярные актеры</h1>
        <ul className={styles.list}>
            { getLis() }
        </ul>
    </div>
}

export default PopularPeopleList;