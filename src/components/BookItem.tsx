import React from 'react'
import { BookInterface } from '../types/BookInterface'

const BookItem = ({book} : {book : BookInterface}) => {
    return (
        <a key={book.id} href="">
            <article>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} title={book.volumeInfo.title} />
                <h4>{book.volumeInfo.title}</h4>
                <p>
                {book.volumeInfo.authors.map((author, index, authors) => (
                    <span key={author}>
                    {author}
                    {index < authors.length - 1 && ", "}
                    </span>
                ))}
                </p>
                <span></span>
            </article>
        </a>
    )
}

export default BookItem