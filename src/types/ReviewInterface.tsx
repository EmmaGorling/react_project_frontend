

export interface ReviewInterface {
    _id: string,
    user: {
        _id?: string
        firstName: string
        lastName: string
    }
    bookId: string
    bookTitle?: string
    reviewText: string
    rating: number
    likes: string[]
    dislikes: string[]
    createdAt: string 
    updatedAt: string
}