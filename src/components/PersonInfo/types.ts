import { IDataActor } from "types";



export type IDataActorWithAdditional = IDataActor & {
    movie_credits: {
        cast: ICreditMovieCast[]
        crew: ICreditMovieCrew[]
    }
    tv_credits: {
        cast: ICreditTVCast[]
        crew: ICreditTVCrew[]
    }
}

export interface IPersonInfoProps {
    item: IDataActor
    tvCredits: {
        cast: ICreditTVCast[]
        crew: ICreditTVCrew[]
    }
    movieCredits: {
        cast: ICreditMovieCast[]
        crew: ICreditMovieCrew[]
    }
}

export interface ICreditsListProps {
    tvCredits: {
        cast: ICreditTVCast[]
        crew: ICreditTVCrew[]
    }
    movieCredits: {
        cast: ICreditMovieCast[]
        crew: ICreditMovieCrew[]
    }
}

export interface ICreditMovieCast {
    character: string
    credit_id: string
    release_date: string
    vote_count: number
    video: boolean
    adult: boolean
    vote_average: number
    title: string
    genre_ids: number[]
    original_language: string
    original_title: string
    popularity: number
    id: number
    backdrop_path: string | null
    overview: string
    poster_path: string | null
}

export interface ICreditMovieCrew {
    id: number
    department: string
    original_language: string
    original_title: string
    job: string
    overview: string
    vote_count: number
    video: boolean
    poster_path: string | null
    backdrop_path: string | null
    title: string
    popularity: number
    genre_ids: number[]
    vote_average: number
    adult: boolean
    release_date: string
    credit_id: string
}

export interface ICreditTVCast {
    credit_id: string
    original_name: string
    id: number
    genre_ids: number[]
    character: string
    name: string
    poster_path: string | null
    vote_count: number
    vote_average: number
    popularity: number
    episode_count: number
    original_language: string
    first_air_date: string
    backdrop_path: string | null
    overview: string
    origin_country: string[]
}

export interface ICreditTVCrew {
    id: number
    department: string
    original_language: string
    episode_count: number
    job: string
    overview: string
    origin_country: string[]
    original_name: string
    genre_ids: number[]
    name: string
    first_air_date: string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    vote_average: number
    poster_path: string | null
    credit_id: string
}