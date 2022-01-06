import { TransitionStatus } from "react-transition-group";
import { ContentDataType, ContentTypes, IDataMovie, IDataTV } from "types";

export type FilmsListSelectionType = "tvs-popular-forrent" | "tvs-popular-online" | "tvs-popular-ontv";

export interface IFilmsListUlProps {
    data?: Array<ContentDataType>
    type: ContentTypes
    ref?: any
    animationState?: TransitionStatus
    animationDuration?: number
}

export interface IFilmsListProps {
    // data: Array<ContentDataType>
    selectionTypes: FilmsListSelectionType[]
}

export interface IFilmsListWithPropsProps {
    data: Array<ContentDataType>
    type: ContentTypes
}

export interface IFilmItemProps {
    item: ContentDataType;
    type: ContentTypes
}

export interface IMovieItemProps {
    item: IDataMovie
}

export interface ITVItemProps {
    item: IDataTV
}