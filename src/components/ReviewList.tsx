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
            <h2>Recensioner</h2>
            {error && <p className="errorMsg">{error}</p>}
            {loading && <p className="loadingMsg">Laddar recensioner...</p>}

            {
                reviews.length === 0 && !loading && <p className="successMsg">Det finns inga recensioner för den här boken ännu.</p>
            }
            { reviews?.length > 0 && (
                <ul className="reviewlist">
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <ReviewItem  review={review} />
                        </li>
                    ))}
                </ul>
                )}
        </div>
    )
}

export default ReviewList