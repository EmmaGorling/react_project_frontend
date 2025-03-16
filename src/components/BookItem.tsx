import React from 'react'
import { NO_THUMBNAIL } from '../../config';
import { BookInterface } from '../types/BookInterface'
import { Link } from 'react-router-dom';

const BookItem = ({book} : {book : BookInterface}) => {
    const thumbnail = book.volumeInfo.imageLinks?.thumbnail || NO_THUMBNAIL;
    const authors = book.volumeInfo.authors || ["Okänd författare"];

    return (
        <Link to={`/book/${book.id}`} key={book.id}>
            <article>
                <img src={thumbnail} alt={book.volumeInfo.title} title={book.volumeInfo.title} />
                <h4>{book.volumeInfo.title}</h4>
                <p>
                {authors.map((author, index, authors) => (
                    <span key={author}>
                    {author}
                    {index < authors.length - 1 && ", "}
                    </span>
                ))}
                </p>
                <span></span>
            </article>
        </Link>
    )
}

export default BookItem