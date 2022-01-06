import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export type IPopularFilmsObject = IPopularMoviesObject | IPopularTVsObject;

export interface IPopularMoviesObject {
    page: number,
    results: IDataMovie[]
    total_results: number
    total_pages: number
}

export interface IPopularTVsObject {
    page: number,
    results: IDataTV[]
    total_results: number
    total_pages: number
}

export interface IPopularFilmsListProps {
    filmsObj: IPopularFilmsObject;
    type: ContentTypes;
}