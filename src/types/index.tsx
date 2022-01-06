import { ICreditsListProps } from "components/PersonInfo/types";

export interface IDataMovie {
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: number[]
    id: number
    original_title: string
    original_language: string
    title: string
    backdrop_path: string | null
    popularity: number
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IDataTV {
    poster_path: string | null
    popularity: number
    id: number
    backdrop_path: string | null
    vote_average: number
    overview: string
    first_air_date: string
    origin_country: string[]
    genre_ids: number[]
    original_language: string
    vote_count: number
    name: string
    original_name: string
}

export type ContentDataType = IDataTV | IDataMovie;

export type ContentTypes = "movie" | "tv"

export interface IDataDetailedMovie {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: object | null
    budget: number
    genres: {
        id: number
        name: string
    }[]
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: {
        id: number
        name: string
        logo_path: string | null
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: {
        iso_3166_1: string
        name: string
    }[]
    status: string
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    recommendations?: {
        results: Array<ContentDataType>
    } 
    similar?: {
        results: Array<ContentDataType>
    }
}

export interface IDataDetailedTV {
    backdrop_path: string | null
    created_by: {
        id: number
        credit_id: string
        name: string
        gender: number
        profile_path: string | null
    }[]
    episode_run_time: number[]
    first_air_date: string
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        season_number: number
        still_path: string | null
        vote_average: number
        vote_count: number
    }
    name: string
    next_episode_to_air: null
    networks: {
        name: string
        id: number
        logo_path: string | null
        origin_country: string
    }[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: {
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
    }[]
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
    recommendations?: {
        results: Array<ContentDataType>
    } 
    similar?: {
        results: Array<ContentDataType>
    }
}

export interface IDataActor {
    birthday: string // 1963-12-18
    known_for_department: string // Acting
    deathday: string | null
    id: number
    name: string
    also_known_as: string[]
    gender: number
    biography: string
    popularity: number // 10.647
    place_of_birth: string | null
    profile_path: string | null //   `/kU3B75TyRiCgE270EyZnHjfivoq.jpg`
    adult: boolean
    imdb_id: string
    homepage: string | null
}

export interface TMDBErrorObject {
    errors: string[];
}