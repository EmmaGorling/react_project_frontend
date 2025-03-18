import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { ReviewInterface } from "../types/ReviewInterface";
import { ReviewItem } from "../components/ReviewItem";

const apiUrl = import.meta.env.VITE_API_URL;

const ProfilePage = () => {

  const { user } = useAuth();

  
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>Min profil</h1>
      <section>
        <p><strong>Förnamn: </strong>{user?.firstName}</p>
        <p><strong>Efternamn: </strong>{user?.lastName}</p>
        <p><strong>E-post: </strong>{user?.email}</p>
      </section>

      <h3>Dina recensioner</h3>
      {
        error && <p className="errorMsg">{error}</p>
      }
      {
        loading && <p className="loadingMsg">Laddar...</p>
      }
      {
        reviews?.length > 0 ? (
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        <ReviewItem  review={review} />
                    </li>
                ))}
            </ul>
        ) : (
            <p>Du har inga recensioner ännu</p>
        )}
      
    </div>
  )
}

export default ProfilePage