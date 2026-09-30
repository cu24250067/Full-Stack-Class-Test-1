import React, { useEffect, useState } from "react";
function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch("http://localhost:5000/api/books")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <h3>Loading books...</h3>;
    }
    if (error) {
        return <h3>Error: {error}</h3>;
    }
    return (
        <div>
            <h2>Book List</h2>
            {books.map((book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
export default BookList;