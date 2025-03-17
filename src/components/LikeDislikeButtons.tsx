import { useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL;

interface LikeDislikeProps {
    reviewId: string;
    initialLikes: number;
    initialDislikes: number;
    userHasLiked: boolean;
    userHasDisliked: boolean;
}

const LikeDislikeButtons: React.FC<LikeDislikeProps> = ({
    reviewId, 
    initialLikes,
    initialDislikes,
    userHasLiked,
    userHasDisliked
}) => {

    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [liked, setLiked] = useState(userHasLiked);
    const [disliked, setDisliked] = useState(userHasDisliked);

    const handleLike = async () => {
        if (liked) return; 

        try {
            await fetch(`${apiUrl}/reviews/${reviewId}/like`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            setLikes((prev) => prev + 1);
            setDisliked(false);
            setLiked(true);
        } catch (error) {
            console.error("Kunde inte gilla recensionen", error);
        }
    };

    const handleDislike = async () => {
        if (disliked) return;

        try {
            await fetch(`${apiUrl}/reviews/${reviewId}/dislike`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            setDislikes((prev) => prev + 1);
            setLiked(false);
            setDisliked(true);
        } catch (error) {
            console.error("Kunde inte ogilla recensionen", error);
        }
    };


    return (
        <div className="like-dislike-container">
            <button
                className={`like-button ${liked ? "active" : ""}`}
                onClick={handleLike}
            >
                👍 {likes}
            </button>
            <button
                className={`dislike-button ${disliked ? "active" : ""}`}
                onClick={handleDislike}
            >
                👎 {dislikes}
            </button>
        </div>
    )
}

export default LikeDislikeButtons