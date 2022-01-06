import { IDataDetailedMovie, IDataDetailedTV } from "types";

export interface IUserChartProps {
    percent: number
}

export interface IMovieReviewProps {
    item: IDataDetailedMovie
}

export interface ITVReviewProps {
    item: IDataDetailedTV
}