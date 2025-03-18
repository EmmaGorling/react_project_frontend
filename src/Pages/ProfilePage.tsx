import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { ReviewInterface } from "../types/ReviewInterface";
import { ReviewItem } from "../components/ReviewItem";

import './css/ProfilePage.scss';

const apiUrl = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null); // State för att hålla reda på vilken recension som redigeras
  const [newReviewText, setNewReviewText] = useState<string>(""); // För att hålla reda på den nya recensionstexten
  const [newRating, setNewRating] = useState<number>(1); // För att hålla reda på det nya betyget

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/users/${user?._id}/reviews`);
      if (!res.ok) throw new Error("Kunde inte hämta recensioner");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      setError("Något gick fel vid hämtning av recensioner");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review: ReviewInterface) => {
    setEditingReviewId(review._id);
    setNewReviewText(review.reviewText);
    setNewRating(review.rating);
  };

  const handleSaveEdit = async (reviewId: string) => {
    try {
      const res = await fetch(`${apiUrl}/reviews/${reviewId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewText: newReviewText,
          rating: newRating,
        }),
      });

      if (!res.ok) throw new Error("Något gick fel när recensionen sparades");

      // Uppdatera recensionen lokalt
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, reviewText: newReviewText, rating: newRating }
          : review
      );
      setReviews(updatedReviews);

      // Stäng redigeringsläget
      setEditingReviewId(null);
    } catch (error) {
      setError("Något gick fel vid uppdatering av recensionen");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
        const res = await fetch(`${apiUrl}/reviews/${reviewId}`, {
            method: "DELETE",
            credentials: "include", // om du använder cookies för autentisering
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Något gick fel vid radering av recensionen");
        }

        // Ta bort recensionen från lokalt tillstånd
        setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
        setError("Något gick fel vid radering av recensionen");
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  return (
    <div>
      <h1>Min profil</h1>
      <section className="profileinfo">
        <p><strong>Förnamn: </strong>{user?.firstName}</p>
        <p><strong>Efternamn: </strong>{user?.lastName}</p>
        <p><strong>E-post: </strong>{user?.email}</p>
      </section>

      <div className="my-reviews">
        <h2>Dina recensioner</h2>
        {
          error && <p className="errorMsg">{error}</p>
        }
        {
          loading && <p className="loadingMsg">Laddar...</p>
        }
        <ul className="reviewlist">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review._id}>
                {/* Om vi är i redigeringsläge för den här recensionen, visa redigeringsformuläret */}
                {editingReviewId === review._id ? (
                  <div className="edit-form">
                    <h4>Redigera recension</h4>
                    <textarea
                      rows={6}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                    />
                    <div className="range">
                      <label>Betyg (1-5) </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                      />
                    </div>
                    <div className="edit-buttons">
                      <button onClick={() => handleSaveEdit(review._id)}>Spara</button>
                      <button className="abortBtn" onClick={handleCancelEdit}>Avbryt</button>
                    </div>
                  </div>
                ) : (
                  // Visar recensionen normalt
                  <ReviewItem review={review} />
                )}

                {/* Redigeringsknapp */}
                {user?._id === review.user._id && !editingReviewId && (
                  <div className="review-buttons">
                    <button className="editBtn" onClick={() => handleEditClick(review)}>Redigera</button>
                    <button className="deleteBtn" onClick={() => handleDeleteReview(review._id)}>Radera</button>
                  </div>
                  
                )}
              </li>
            ))
          ) : (
            <p>Du har inga recensioner ännu</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;