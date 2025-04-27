export interface VideoGameResponse {
    videoGameSet: VideoGameDto[]
}

export interface VideoGameDto {
    id: string,
    title?: string,
    genre?: string
}
