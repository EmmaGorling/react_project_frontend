import { ReviewInterface } from "../types/ReviewInterface"
import LikeDislikeButtons from "./LikeDislikeButtons"
import { useAuth } from "../context/authContext"

import './css/ReviewItem.scss';
import { Link } from "react-router-dom";


export const ReviewItem = ({ review }: { review: ReviewInterface }) => {
    const { user } = useAuth();

    return (
        <div className="review-item-wrapper">
        <Link to={`/book/${review.bookId}`} className="review-item">
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
            <div className="bottom">
                <span>
                    <strong>Betyg: </strong> 
                    <span className="stars">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                </span>
                
            </div>
        </Link>
        <div className="button-wrapper">
            <LikeDislikeButtons
                reviewId={review._id}
                initialLikes={review.likes?.length ?? 0}
                initialDislikes={review.dislikes?.length ?? 0}
                userHasLiked={user ? review.likes?.includes(user._id) : false}
                userHasDisliked={user ? review.dislikes?.includes(user._id) : false}
            />
            </div>
        </div>
    )
}
