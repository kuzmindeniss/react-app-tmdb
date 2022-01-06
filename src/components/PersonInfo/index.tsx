import { IPersonInfoProps } from "./types";
import styles from "./PersonInfo.module.scss";
import CreditsList from "./CreditsList";

const PersonInfo: React.FC<IPersonInfoProps> = (props: IPersonInfoProps) => {
    const photoPath = "http://image.tmdb.org/t/p/w342" +  props.item.profile_path || process.env.NEXT_PUBLIC_PHOTO_NOT_FOUND!;
    const name = props.item.name;
    const biography = props.item.biography;

    const getBiography = (str: string) => {
        const bio = str.split("\n\n");
        let items = bio.map((item, idx) => <p key={idx}>{ item }</p>)
        return items;
    }

    const getPersonalInfo = () => {
        const items: {key: string, value: string}[] = [];
        if (props.item.birthday) items.push({key: "Дата рождения", value: props.item.birthday});
        if (props.item.deathday) items.push({key: "Дата смерти", value: props.item.deathday});
        if (props.item.place_of_birth) items.push({key: "Место рождения",  value: props.item.place_of_birth});


        const getPersonalInfoLis = () => {
            const lis = items.map((item, idx) => {
                return (
                    <li className={styles.personalInfoItem} key={idx}>
                        <div className={styles.personalInfoKey}>{ item.key }</div>
                        <div className={styles.personalInfoValue}>{ item.value }</div>
                    </li>
                )
            });
            return lis;
        }

        if (!items.length) return null;

        return (
            <section className={styles.personalInfo}>
                <h2>Персональная информация</h2>
                <ul className={styles.personalInfoList}>
                    { getPersonalInfoLis() }
                </ul>
            </section>
        )
    }


    return (<div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.photoWrapper}>
                <img src={photoPath} alt="photo"/>
            </div>
            { getPersonalInfo() }
        </div>
        <div className={styles.rightContiner}>
            <h1>{ name }</h1>

            {biography && (
                <section className={styles.biography}>
                    <h2>Биография</h2>

                    { getBiography(biography) }
                </section>
            )}
            
            <CreditsList tvCredits={props.tvCredits} movieCredits={props.movieCredits}/>
        </div>
    </div>)
}

export default PersonInfo;