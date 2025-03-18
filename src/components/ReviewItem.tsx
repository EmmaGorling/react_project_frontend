import { ReviewInterface } from "../types/ReviewInterface"
import LikeDislikeButtons from "./LikeDislikeButtons"
import { useAuth } from "../context/authContext"

const apiUrl = import.meta.env.VITE_API_URL;

export const ReviewItem = ({ review }: { review: ReviewInterface }) => {
    const { user } = useAuth();

    

    return (
        <>
            {
                review.bookTitle && <h5>{review.bookTitle}</h5>
            }
            
            <p>
                <strong>{review.user?.firstName} {review.user?.lastName}</strong> |{" "}
                {new Date(review.createdAt).toLocaleString("sv-SE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })}
            </p>
            <p>{review.reviewText}</p>
            <span>
            <strong>Betyg: </strong> 
                <span className="stars">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </span>
            </span>
            <LikeDislikeButtons
                reviewId={review._id}
                initialLikes={review.likes?.length ?? 0}
                initialDislikes={review.dislikes?.length ?? 0}
                userHasLiked={user ? review.likes?.includes(user._id) : false}
                userHasDisliked={user ? review.dislikes?.includes(user._id) : false}
            />
            <div>
                {
                    user?._id == review.user._id && (
                        <>
                            <button>Redigera</button>
                            <button>Radera</button>
                        </>
                    )
                }
            </div>
        </>
    )
}
