

export interface ReviewInterface {
    _id: string,
    user: {
        firstName: string
        lastName: string
    }
    bookId: string
    reviewText: string
    rating: number
    likes: string[]
    dislikes: string[]
    createdAt: string 
    updatedAt: string
}