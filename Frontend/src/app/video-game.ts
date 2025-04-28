export interface VideoGameResponse {
    videoGameSet: VideoGame[]
}

export interface VideoGame {
    id: string,
    title?: string,
    genre?: string,
    description?: string
}
