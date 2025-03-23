import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import  DOMPurify from 'dompurify';
import { BOOKS_URL, NO_THUMBNAIL } from '../../config';
import { BookInterface } from '../types/BookInterface';
import { useAuth } from '../context/authContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
const apiKey = import.meta.env.VITE_API_KEY;

import './css/BookDetails.scss'

const BookDetailPage = () => {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>(); 
    const [book, setBook] = useState<BookInterface | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const thumbnail = book?.volumeInfo.imageLinks?.thumbnail || NO_THUMBNAIL;
    const authors = book?.volumeInfo.authors || ["Okänd författare"];

    const [refreshReviews, setRefreshReviews] = useState(false);

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            setLoading(true);
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

    // Refresh reviews
    const handleReviewAdded = () => {
        setRefreshReviews((prev) => !prev); 
    };

    const sanitizedDescription = book?.volumeInfo?.description
        ? DOMPurify.sanitize(book.volumeInfo.description, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'a', 'br'], // Allow specific tags
            ALLOWED_ATTR: ['href'], // Only allow href for links
        })
        : "Ingen beskrivning tillgänglig";


    return (
        <div>
            {
                loading && <p className='loadingMsg'>Laddar...</p>
            }
            { 
                error && <p className='errorMsg'>{error}</p>
            }

            {
                book && ( 
                    <div>
                        <h1>{book.volumeInfo?.title}</h1>
                        <div className='book'>
                            <div className='flex'>
                                <img src={thumbnail} alt={book.volumeInfo.title} title={book.volumeInfo.title} />

                                <div className='info'>
                                    <p>
                                        <strong>Författare: </strong>
                                            {authors.map((author, index, authors) => (
                                                <span key={author}>
                                                {author}
                                                {index < authors.length - 1 && ", "}
                                                </span>
                                            ))}
                                    </p>
                                    <p><strong>Antal sidor: </strong>{book.volumeInfo.pageCount}</p>
                                    <p><strong>Publiceringsdatum: </strong>{book.volumeInfo.publishedDate}</p>
                                    <p><strong>Kategorier: </strong>{book.volumeInfo.categories?.map((category, index, categories) => (
                                        <span key={category}>
                                        {category}
                                        {index < categories.length - 1 && ", "}
                                        </span>
                                    ))}</p>
                                </div>
                                
                            </div>
                            <div className='description'>
                                <h2>Beskrivning</h2>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizedDescription,
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            
            {
                user && id && book && (
                    <div>
                        <ReviewForm bookId={id} bookTitle={book.volumeInfo.title} onReviewAdded={handleReviewAdded} />
                    </div>
                )
            }
            {
                id && <ReviewList bookId={id} refresh={refreshReviews} />
            }
        </div>
    )
}

export default BookDetailPage