import { useState } from 'react';
import { BookInterface } from '../types/BookInterface.ts';
import BookItem from './BookItem.tsx';

import { BOOKS_URL, QUERY_PARAMS } from '../../config.ts';
const apiKey = import.meta.env.VITE_API_KEY; 

import './css/SearchBooks.scss'

const SearchBooks = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<BookInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!query.trim()) return;    
        
        setLoading(true);
        setError("");

        try {
            const encodedQuery = encodeURIComponent(query);
            const res = await fetch(`${BOOKS_URL}?q=${encodedQuery}&key=${apiKey}&maxResults=20&fields=${QUERY_PARAMS.fields}`);
            const data = await res.json();

            if(data.items) {
                setBooks(data.items)
            } else {
                setBooks([]);
                setError("Inga resultat hittades");
            }
        } catch (error) {
            setError("Något gick fel vid hämtning av data");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className='search'>
            <div className='search-input'>
                <h2>Hitta din bok</h2>
                <form onSubmit={handleSearch}>
                    <div className='form-section-center'>
                        <label htmlFor="query">Sök efter titel eller författare</label>
                        <input 
                            type="text" 
                            value={query}
                            onChange = {(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" >Sök</button>
                </form>
            </div>

            {loading && <p className='loadingMsg'>Laddar...</p>}
            {error && <p className='errorMsg'>{error}</p>}

            {
                books.length > 0 && 
                (
                    <section className='result'>
                        <h3>Sökresultat</h3>
                        <div className='result-flex'>
                        {books.map((book) => (
                            <BookItem key={book.id} book={book} />
                        ))}
                        </div>
                    </section>
                ) 
            }
            
        </div>
    )
}

export default SearchBooks