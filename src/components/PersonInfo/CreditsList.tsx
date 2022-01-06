import { Link } from "react-router-dom";
import styles from "./PersonInfo.module.scss";
import { ICreditMovieCast, ICreditMovieCrew, ICreditsListProps, ICreditTVCast, ICreditTVCrew } from "./types";

const CreditsList: React.FC<ICreditsListProps> = (props: ICreditsListProps) => {
    const creditsOnYears: {
        [key: string]: Array<{item: ICreditMovieCast | ICreditMovieCrew | ICreditTVCast | ICreditTVCrew, type: "movie" | "tv" | undefined}>
    } = {}

    const usedCreditId: {
        [key: string]: boolean
    } = {};

    const initCreditsOnYears = () => {
        props.tvCredits.cast.map(item => {
            if (item.first_air_date){
                const year = item.first_air_date.slice(0, 4);
                if (!creditsOnYears[year]) creditsOnYears[year] = [{item: item, type: "tv"}]
                else creditsOnYears[year].push({item: item, type: "tv"});
            }
        });

        props.tvCredits.crew.map(item => {
            if (item.first_air_date){
                const year = item.first_air_date.slice(0, 4);
                if (!creditsOnYears[year]) creditsOnYears[year] = [{item: item, type: "tv"}]
                else creditsOnYears[year].push({item: item, type: "tv"});
            }
        });

        props.movieCredits.cast.map(item => {
            if (item.release_date){
                const year = item.release_date.slice(0, 4);
                if (!creditsOnYears[year]) creditsOnYears[year] = [{item: item, type: "movie"}]
                else creditsOnYears[year].push({item: item, type: "movie"});
            }
        });

        props.movieCredits.crew.map(item => {
            if (item.release_date){
                const year = item.release_date.slice(0, 4);
                if (!creditsOnYears[year]) creditsOnYears[year] = [{item: item, type: "movie"}]
                else creditsOnYears[year].push({item: item, type: "movie"});
            }
        });
    }

    initCreditsOnYears();

    const getCreditsList = () => {
        const getCreditsUlInYear = (year: string): JSX.Element => {
            const credits = creditsOnYears[year];
            const items = credits.map(item => {
                const itemName = (item.item as ICreditTVCast).name || (item.item as ICreditMovieCast).title;
                const id = item.item.id;
                const type = item.type;
                const as = (item.item as ICreditMovieCast).character || (item.item as ICreditMovieCrew).department;
                if (usedCreditId[id]) return null;
                usedCreditId[id] = true;
    
                return (<li key={id} className={styles.creditsItem}>
                    <div className={styles.creditsItemYear}>{ year }</div>
                    <Link to={`/${type}/${id}`} className={styles.creditsItemName}>
                        { itemName }
                    </Link>
                </li>)
            })
    
            return (<ul className={styles.yearUl}>
                {items}
            </ul>)
        }

        const creditYearUls = Object.keys(creditsOnYears).reverse().map(year => {
            return (<li key={year} className={styles.creditsItemWithUl}>
                {getCreditsUlInYear(year)}
            </li>)
        });

        return (<ul className={styles.creditsList}>
            { creditYearUls }
        </ul>)
    }

    if (!props.movieCredits && !props.tvCredits) return null;

    return (
        <section className={styles.creditsListContainer}>
            <h2>Участие в проектах:</h2>
            {getCreditsList()}
        </section>
    )
}

export default CreditsList;