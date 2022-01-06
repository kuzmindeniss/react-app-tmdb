import React from 'react';
import { IFilmsListUlProps } from './FilmsSelection.types';
import Item from './FilmsSelectionItem';
import styles from './FilmsSelectionList.module.scss';

const ListUl: React.FC<IFilmsListUlProps> = React.forwardRef<HTMLUListElement, IFilmsListUlProps>(function forwListUl(props: IFilmsListUlProps, ref){
    const defaultStyle = props.animationDuration ? {
        transition: `all ${props.animationDuration}ms ease-in-out`,
        opacity: 0,
    } : {};

    const transitionStyles: {
        [key: string]: {
            [key: string] : number |string
        }
    } = props.animationDuration ? {
        entering: {
            opacity: 1,
            transform: "scale(.001)"
        },
        entered:  {
            opacity: 1,
            transform: "scale(1)",
        },
        exiting:  {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            transform: "scale(.001)"
        },
        exited:   {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0
        },
    } : {};



    const getItems = (): JSX.Element[] => {
        if (!props.data) return [];

        const items = props.data.map((item, idx) => {
            return <Item item={item} key={item.id} type={props.type}/>
        });

        return items;
    }

    return (
        <ul className={styles.list} ref={ref} style={{
            ...defaultStyle,
            ...transitionStyles[props.animationState ? props.animationState : '']
        }}>
            { getItems() }
        </ul>
    )
})

export default ListUl