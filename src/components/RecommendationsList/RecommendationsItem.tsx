import React from 'react';
import { IDataMovie, IDataTV } from 'types';
import RecommendationsMovieItem from './RecommendationsMovieItem';
import RecommendationsTVItem from './RecommendationsTVItem';
import { IRecommendationsItemProps } from './types';

const RecommendationsItem: React.FC<IRecommendationsItemProps> = (props: IRecommendationsItemProps) => {
    switch(props.type) {
        case "movie":
            return <RecommendationsMovieItem  item={props.item as IDataMovie} />
            break;
        case "tv":
            return <RecommendationsTVItem  item={props.item as IDataTV} />
            break;
        default:
            return null
    }
}

export default RecommendationsItem;