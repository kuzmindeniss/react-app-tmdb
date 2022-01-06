import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export interface IRecommendationsMovieItemProps {
    item: IDataMovie
}

export interface IRecommendationsTVItemProps {
    item: IDataTV
}

export interface IRecommendationsListProps {
    data: ContentDataType[]
    type: ContentTypes
}

export interface IRecommendationsItemProps {
    item: ContentDataType
    type: ContentTypes
}