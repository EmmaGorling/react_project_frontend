import React, { useEffect, useState } from 'react'

const RandomBooks = () => {

    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            fetch("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderby=relevance&key=AIzaSyAVgdcSTuwQUjbj-7ogZbZJA3dpLu-xatQ")
                .then(res => res.json())
                .then(data => console.log(data.items));
                
        } catch (error) {
            setError("Något gick fel");
        }
    }
    return (
        <div>
            <h1>Random</h1>
            
        </div>
    )
}

export default RandomBooks