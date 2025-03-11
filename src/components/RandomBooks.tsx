import React, { useEffect, useState } from 'react'
import { BASE_URL, QUERY_PARAMS } from '../../config.ts';
const apiKey = import.meta.env.VITE_API_KEY; 

// During dev
import exampleData from '../../example.json';

interface Book {
    id: string,
    volumeInfo: {
        title: string,
        subtitle?: string,
        authors: string[],
        description: string,
        imageLinks: {
            thumbnail: string
        }
    }
}

const RandomBooks = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            /*const res = await fetch(`${BASE_URL}?q=subject:fiction&orderby=relevance&key=${apiKey}&fields=${QUERY_PARAMS.fields}`)
            const data = await res.json();
            setBooks(data.items);*/
            setBooks(exampleData);
        } catch (error) {
            setError("Något gick fel");
        }
    }
    return (
        <div>
            <h1>Random</h1>
            <ul>
                {
                    books.map((book) => (
                        <li key={book.id}>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                            <h4>{book.volumeInfo.title}</h4>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}

export default RandomBooks