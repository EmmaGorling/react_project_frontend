import { useState } from "react";
import { useAuth } from "../context/authContext";

const apiUrl = import.meta.env.VITE_API_URL;

const ProfilePage = () => {

  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  return (
    <div>
      <h1>Min profil</h1>
      <section>
        <p><strong>Förnamn: </strong>{user?.firstName}</p>
        <p><strong>Efternamn: </strong>{user?.lastName}</p>
        <p><strong>E-post: </strong>{user?.email}</p>
      </section>
    </div>
  )
}

export default ProfilePage