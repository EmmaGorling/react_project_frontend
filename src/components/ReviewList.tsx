import { useEffect, useState } from "react"
import { ReviewInterface } from "../types/ReviewInterface";
import { ReviewItem } from "./ReviewItem";
const apiUrl = import.meta.env.VITE_API_URL;

const ReviewList = ({ bookId, refresh } : { bookId: string, refresh: boolean }) => {

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getReviews();
    }, [bookId, refresh]);

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
                <ul className="reviewlist">
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <ReviewItem  review={review} />
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