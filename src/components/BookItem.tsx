
import { NO_THUMBNAIL } from '../../config';
import { BookInterface } from '../types/BookInterface'
import { Link } from 'react-router-dom';

import './css/BookItem.scss';

const BookItem = ({book} : {book : BookInterface}) => {
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || NO_THUMBNAIL;
    const authors = book.volumeInfo.authors || ["Okänd författare"];

    return (
        <Link to={`/book/${book.id}`} key={book.id} className='book-item'>
            <article>
                <img src={thumbnail} alt={book.volumeInfo.title} title={book.volumeInfo.title} />
                <h4>
                    {
                        book.volumeInfo.title.length > 30 
                        ? book.volumeInfo.title.substring(0, 30) + "..." 
                        : book.volumeInfo.title
                    }
                </h4>
                <p><strong>Av:</strong><br></br>
                {authors.map((author, index, authors) => (
                    <span key={author}>
                    {author}
                    {index < authors.length - 1 && ", "}
                    </span>
                ))}
                </p>
            </article>
        </Link>
    )
}

export default BookItem