import { useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";

interface ReviewEditFormProps {
    review: ReviewInterface;
    onSave: (reviewId: string, reviewText: string, rating: number) => void;
    onCancel: () => void;
}

const ReviewEditForm: React.FC<ReviewEditFormProps> = ({ review, onSave, onCancel }) => {
    const [reviewText, setReviewText] = useState(review.reviewText);
    const [error, setError] = useState("");
    const [rating, setRating] = useState(review.rating);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (reviewText.length < 5) {
            setError("Recensionstexten får inte vara kortare än 5 tecken");
            return;
        }
        onSave(review._id, reviewText, rating);
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
        <h4>Redigera recension</h4>
        
        <textarea
            rows={6}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
        />
        <div className="range">
            <label>Betyg (1-5)</label>
            <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            />
        </div>
        { error && <span className="label-error">{error}</span>}
        <div className="edit-buttons">
            <button type="submit">Spara</button>
            <button type="button" className="abortBtn" onClick={onCancel}>
            Avbryt
            </button>
        </div>
        </form>
    );
};

export default ReviewEditForm;