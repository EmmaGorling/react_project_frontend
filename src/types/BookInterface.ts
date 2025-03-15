export interface BookInterface {
    id: string,
    volumeInfo: {
        title: string,
        subtitle?: string,
        authors: string[],
        description: string,
        imageLinks: {
            thumbnail: string
        }
    }
}