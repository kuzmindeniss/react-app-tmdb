import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import { createSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchQueryValue, setSearchQueryValue] = useState('');
    // const router = useRouter();
    const navigate = useNavigate();

    const logoPath = "/svgs/logo.svg";
    const searchSvgPath = "/svgs/search.svg";
    
    const searchSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const params = {
            q: searchQueryValue
        };

        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`,
        }, {replace: true})
    }

    const changeSearchForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryValue(e.target.value);
    }

    const getSearchForm = (props: {isMobile?: boolean; isDesktop?: boolean}): JSX.Element => {
        return <div className={classNames(styles.searchContainer, {
            [styles.searchContainerDesktop]: props.isDesktop,
            [styles.searchContainerMobile]: props.isMobile
        })}>
            <form className={styles.searchForm} onSubmit={searchSubmit}>
                <input className={styles.searchInput} type="text" name="search" placeholder="Поиск" onChange={changeSearchForm} value={searchQueryValue}/>
                <button className={styles.searchButton}>
                    <img src={searchSvgPath} width={18} height={18}alt="search"/>
                </button>
            </form>
        </div>
    }

    return (<header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <div className={styles.left}>
                    <Link className={styles.logoWrapper} to="/">
                        <img src={logoPath} width={154} height={20} alt="logo"/>
                    </Link>
                </div>
                { getSearchForm({isDesktop: true}) }
                <div className={styles.right}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to="/movie" className={styles.itemHref}>
                                Фильмы
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/tv" className={styles.itemHref}>
                                Сериалы
                            </Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/person" className={styles.itemHref}>
                                Актеры
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.containerBottom}>
                { getSearchForm({isMobile: true}) }
            </div>
        </div>
    </header>)
}

export default Header;