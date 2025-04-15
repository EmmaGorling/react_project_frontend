import { useState } from "react"
const apiUrl = import.meta.env.VITE_API_URL;

const ReviewForm = ({ bookId, bookTitle, onReviewAdded } : { bookId: string, bookTitle: string, onReviewAdded: () => void }) => {

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (reviewText.length < 5) {
            setError("Recensionstexten får inte vara kortare än 5 tecken");
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/reviews`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookId, bookTitle, reviewText, rating })
            });

            if(!res.ok) {
                setError("Något gick fel när recensionen skickades")
            }

            setSuccess(true);
            setError("");
            setReviewText("");
            setRating(1);

            // Trigger update
            onReviewAdded();
        } catch (error) {
            setError("Något gick fel när recensionen skickades")
        }
    }

    return (
        <div>
            <h2>Lämna en recension</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    
                    <label htmlFor="reviewText">Kommentar</label>
                    <textarea 
                    rows={6}
                    name="reviewText" 
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className="range">
                    <label htmlFor="rating">Betyg (1-5)</label>
                    <input 
                        type="range" 
                        id="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                {
                    error && <p className="errorMsg">{error}</p>
                }
                {
                    success && <p className="successMsg">Din recension har sparats!</p>
                }

                <button type="submit">Publicera</button>
                
            </form>
        </div>
    )
}

export default ReviewForm