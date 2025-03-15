import React, { useEffect, useState } from 'react';
import { BookInterface } from '../types/BookInterface';
import BookItem from './BookItem';
// import { BOOKS_URL, QUERY_PARAMS } from '../../config.ts';
const apiKey = import.meta.env.VITE_API_KEY; 

// During dev
import exampleData from '../../example.json';

const RandomBooks = () => {

    const [books, setBooks] = useState<BookInterface[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            setLoading(true);
            /*const res = await fetch(`${BOOKS_URL}?q=subject:fiction&orderby=relevance&key=${apiKey}&fields=${QUERY_PARAMS.fields}`)
            const data = await res.json();
            setBooks(data.items);*/
            setBooks(exampleData);
            
        } catch (error) {
            setError("Något gick fel");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Random</h1>
            <section>
                {
                    books.map((book) => (
                        <BookItem book={book} />
                    ))
                }
            </section>
        </div>
    )
}

export default RandomBooks