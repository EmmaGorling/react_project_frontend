import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import  DOMPurify from 'dompurify';
import { BOOKS_URL } from '../../config';
import { BookInterface } from '../types/BookInterface';
const apiKey = import.meta.env.VITE_API_KEY;

const BookDetailPage = () => {
    const { id } = useParams<{ id: string }>(); 
    const [book, setBook] = useState<BookInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await fetch(`${BOOKS_URL}/${id}?key=${apiKey}`);
                const data = await res.json();

                if (data) {
                    setBook(data);
                } else {
                    setError("Boken kunde inte hämtas");
                }
            } catch (err) {
                setError("Något gick fel vid hämtning av boken");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {
                loading && <p>Laddar...</p>
            }
            { 
                error && <p>{error}</p>
            }

            {
                book && ( 
                    <div>
                        <h1>{book.volumeInfo?.title}</h1>
                        <p><strong>Författare:</strong> {book.volumeInfo?.authors?.join(", ") || "Okänd"}</p>
                        {book.volumeInfo?.imageLinks?.thumbnail && (
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                        <h3>Beskrivning</h3>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(book.volumeInfo?.description || "Ingen beskrivning tillgänglig")
                            }} 
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default BookDetailPage