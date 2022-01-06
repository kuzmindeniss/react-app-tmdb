import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export type SearchListSlugs = "movie" | "tv"

export interface IFilmsSearchList {
}

export interface IListUlProps {
    data: ContentDataType[]
    type: ContentTypes
    animationDuration: number
    animationState: string
    isLoading: boolean
}

export interface IFilmsSearchItemProps {
    item: ContentDataType
    type: ContentTypes
}

export interface IFilmsSearchMovieItemProps {
    item: IDataMovie
}

export interface IFilmsSearchTVItemProps {
    item: IDataTV
}