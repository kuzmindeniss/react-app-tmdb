import { IDataMovie, IDataTV } from "types";

export interface IPopularPeopleObject {
    page: number,
    results: IPopularPeopleResultItem[]
    total_results: number
    total_pages: number
}

export interface IPopularPeopleResultItem {
    profile_path: string
    adult: boolean
    id: number
    name: string
    popularity: number
    known_for: IDataMovie[] | IDataTV[]
}

export interface IPopularPeopleListProps {
    popularObj: IPopularPeopleObject;
}