// strona do wyszukiwania filmów
import React, { useEffect, useState } from 'react'
import { KartaFilm }  from '../doFilmow/KartaFilm';
import { TextField } from '@mui/material';

export const Szukaj = () => {

    const [query, setQuery] = useState(""); //do zapisania wyszukiwań użytkownika
    const [results, setResults] = useState([]); //do zapisania filmow wyszukanych przez uzytownika
    const [movies, setMovies] = useState([]); //do zapisania filmow popularnych

    // zapisuje w movies 20 popularnych filmów 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((res) => res.json())
        .then((data) => setMovies(data.results))
}, []);

    const onChange = e => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            if(!data.errors) {
                setResults(data.results);
            } else {
                setResults([]);
            }
        });
    };
  return (

    <div>
    <div>
        <h1 className='main_title'>Szukaj filmów</h1>
    </div>

    {/* miejsce na wyszukiwanie filmow */}
    <div className='searchBox'>
        <TextField
        style={{ flex: 1}}
        className='searchBox'
        label="Szukaj filmu"
        variant="filled"
        value={query}
        onChange={onChange}
        />
    </div>


    <div className='movies_container'>
    {/* jeżeli użytkownik nie wpisał filmu do wyszukania, to wyświetlają się filmy popularne*/}
    {results.length <= 0 && query.length === 0 && movies.map((movie) => 
        <KartaFilm key={movie.id} movie={movie}/>
    )}

    {/* jeżeli użytkownik wyszukuje filmy to te filmy są wyświetlane */}
    {results.length > 0 && results.map((movie) => 
        <KartaFilm key={movie.id} movie={movie}/>
    )}

    {/* jeżeli użytkownik wpisał nazwe filmu, który nie istnieje to wyświetli się napis */}
    {results.length <= 0 && query.length > 0 &&
        (<h2 className='not_found_text'>Nie znaleziono filmu</h2>)}

    </div>

    </div>
  );
;}
