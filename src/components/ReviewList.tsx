import { useEffect, useState } from "react"
import { ReviewInterface } from "../types/ReviewInterface";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { useAuth } from "../context/authContext";
const apiUrl = import.meta.env.VITE_API_URL;

const ReviewList = ({ bookId } : {bookId: string}) => {
    const { user } = useAuth();

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getReviews();
    }, [bookId]);

    const getReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/reviews/book/${bookId}`);
            if (!res.ok) throw new Error("Kunde inte hämta recensioner");
            const data = await res.json();
            
            setReviews(data);
            setError("");
        } catch (error) {
            setError("Något gick fel vid hämtning av recensioner");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h3>Recensioner</h3>
            {error && <p>{error}</p>}
            {loading && <p>Laddar recensioner...</p>}

            {reviews?.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <p><strong>{review.user?.firstName} {review.user?.lastName}</strong></p>
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Det finns inga recensioner för den här boken ännu.</p>
            )}
        </div>
    )
}

export default ReviewList