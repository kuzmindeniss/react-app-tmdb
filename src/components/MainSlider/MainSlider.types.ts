export interface ISliderItem {
    title: string
    description: string
    imageUrl: string
    id: number
}

export interface IMainSliderProps {
    items: ISliderItem[]
    intervalMs?: number
    sizes: {
        width: number
        height: number
    }
}

export interface IMainSliderItemProps {
    item: ISliderItem
    width: string
}