import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { ReviewInterface } from "../types/ReviewInterface";
import { ReviewItem } from "../components/ReviewItem";
import ReviewEditForm from "../components/ReviewEditForm";

import './css/ProfilePage.scss';

const apiUrl = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

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

  const handleSaveEdit = async (reviewId: string, reviewText: string, rating: number) => {
    try {
      const res = await fetch(`${apiUrl}/reviews/${reviewId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewText, rating }),
      });

      if (!res.ok) throw new Error("Något gick fel när recensionen sparades");

      // Uppdatera recensionen lokalt
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, reviewText, rating } : review
        )
      );

      setEditingReviewId(null);
    } catch (error) {
      setError("Något gick fel vid uppdatering av recensionen");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const res = await fetch(`${apiUrl}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Något gick fel vid radering av recensionen");

      // Ta bort recensionen lokalt
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      setError("Något gick fel vid radering av recensionen");
    }
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
        <h2>Mina recensioner</h2>
        {error && <p className="errorMsg">{error}</p>}
        {loading && <p className="loadingMsg">Laddar...</p>}
        <ul className="reviewlist">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review._id}>
                {editingReviewId === review._id ? (
                  <ReviewEditForm
                    review={review}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingReviewId(null)}
                  />
                ) : (
                  <>
                    <ReviewItem review={review} />
                    {user?._id === review.user._id && (
                      <div className="review-buttons">
                        <button className="editBtn" onClick={() => setEditingReviewId(review._id)}>
                          Redigera
                        </button>
                        <button className="deleteBtn" onClick={() => handleDeleteReview(review._id)}>
                          Radera
                        </button>
                      </div>
                    )}
                  </>
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