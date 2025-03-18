import { useState } from 'react'
import { useAuth } from '../context/authContext';
const apiUrl = import.meta.env.VITE_API_URL;

import './css/LikeDislikeButton.scss';

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
    const {user} = useAuth();

    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [liked, setLiked] = useState(userHasLiked);
    const [disliked, setDisliked] = useState(userHasDisliked);

    const handleLike = async () => {
        if (liked) return; 
        if (!user) return;

        try {
            await fetch(`${apiUrl}/reviews/${reviewId}/like`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            if (liked) {
                // Om användaren redan har gillat, ta bort gillamarkeringen
                setLikes(prev => prev - 1);
                setLiked(false);
            } else {
                // Om användaren ogillat innan, minska dislikes
                if (disliked) {
                    setDislikes(prev => prev - 1);
                    setDisliked(false);
                }
                setLikes(prev => prev + 1);
                setLiked(true);
            }
        } catch (error) {
            console.error("Kunde inte gilla recensionen", error);
        }
    };

    const handleDislike = async () => {
        if (disliked) return;
        if (!user) return;

        try {
            await fetch(`${apiUrl}/reviews/${reviewId}/dislike`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            if (disliked) {
                // Om användaren redan har ogillat, ta bort ogillamarkeringen
                setDislikes(prev => prev - 1);
                setDisliked(false);
            } else {
                // Om användaren gillat innan, minska likes
                if (liked) {
                    setLikes(prev => prev - 1);
                    setLiked(false);
                }
                setDislikes(prev => prev + 1);
                setDisliked(true);
            }
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