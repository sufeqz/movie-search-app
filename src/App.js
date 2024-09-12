import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";  
import './App.css';
import SearchIcon from './search.svg';

const AP_URL = 'http://www.omdbapi.com/?apikey=b2097439&';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${AP_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {     
        searchMovies('Harry potter');
    }, []);

    return (
        <div className="app">
            <h1>Movie Khujoo</h1>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term as the user types
                />
                <img 
                    src={SearchIcon} 
                    alt="search" 
                    onClick={() => searchMovies(searchTerm)} // Trigger search on click
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} /> // Ensure each MovieCard has a unique key
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies Found!</h2>
                </div>
            )}
        </div>
    );
};

export default App;
