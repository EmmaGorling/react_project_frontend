import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import { ReviewItem } from "./ReviewItem";
const apiUrl = import.meta.env.VITE_API_URL;

const TopReviews = () => {
    const [topReviews, setTopReviews] = useState<ReviewInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTopReviews();
    }, []);

    const fetchTopReviews = async () => {
        try {
            setError("");
            const res = await fetch(`${apiUrl}/reviews/top`);
            const data = await res.json();
            setTopReviews(data);
        } catch (error) {
            setError("Kunde inte hämta topprankade recensioner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="top-reviews">
            <h2>Topprankade recensioner ⭐⭐⭐⭐⭐</h2>
            {loading && <p className="loadingMsg">Laddar...</p>}
            {error && <p className="errorMsg">{error}</p>}
            { topReviews.length === 0 && !loading && <p className="successMsg">Inga recensioner hittade</p>}
            {   
                topReviews.length > 0 && (
                    <ul className="reviewlist">
                        {topReviews.map((review) => (
                            <li  key={review._id}>
                                <ReviewItem review={review} />
                            </li>
                        ))}
                    </ul>
                ) 
            }
        </section>
    )
}

export default TopReviews