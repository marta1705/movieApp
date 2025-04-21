import React, { useEffect, useState } from 'react'
import Kategorie from '../doFilmow/Kategorie';
import { KartaFilm } from '../doFilmow/KartaFilm';
import Strony from '../doFilmow/Strony';

export const Glowna = () => {

  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState(28);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreList}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setNumOfPages(data.total_pages);
      })
    }, [genreList, page]);


  return (
    <div>
      <h1 className='main_title'>Strona Główna</h1>
      <div className='main_page'>
        <div className='movie_categories_div'>
          <Kategorie setPage={setPage} genreList={genreList} setGenreList={setGenreList}/>
        </div>
        <div className='movies_box'>
          <div className='movies_container'>
            {movies?.map((movie) => 
            <KartaFilm key={movie.id} movie={movie} />
          )}
          </div>

        </div>
      </div>
      {numOfPages > 1 && (
          <Strony setPage={setPage} currentPage={page} />
        )}
    </div>
  );
};

