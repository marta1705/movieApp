// pojedynczy film 
import React, {useContext} from 'react'
import { GlobalContext } from '../Context/GlobalState';
import { Stack, Typography } from "@mui/material";
import ContentModal from './ContentModal';
import StarIcon from '@mui/icons-material/Star';

export const KartaFilm = ({movie}) => {

  const {
    addMovieToWatchlist, watchlist, watched, addMovieToWatched
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find(o => o.id === movie.id);
  let storedMovieWatched = watched.find(o => o.id === movie.id);

  const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true : false;
  const watchedDisabled = storedMovieWatched ? true : false;


  return (
    <div className='media'>
            {/* <Badge badgeContent={movie.vote_average} color={movie.vote_average>6?'primary' : 'secondary'}/> */}

            <ContentModal id={movie.id}>
            {movie.poster_path ? (
            <img className="poster" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`${movie.title} Plakat`} />
            ) : (
            <img className='poster' src="https://www.movienewz.com/img/films/poster-holder.jpg" alt='Plakat niedostępny'/>
            )}
            </ContentModal>

            <b className='title'>{movie.title}</b>
            <div className='vote_date_div'>
              <Stack alignItems="center" direction="row" gap={1}>
                <StarIcon />
                <Typography fontFamily="Playfair Display" variant='body1'>{movie.vote_average}</Typography>
              </Stack>
              <span className='subTitle'>
                  {movie.release_date}
              </span>
            </div>

            <div className='btn-div'>
              <button className='btn' disabled={watchlistDisabled} onClick={() => addMovieToWatchlist(movie)}>Dodaj do obejrzenia</button>
              <button className='btn' disabled={watchedDisabled} onClick={() => addMovieToWatched(movie)}>Dodaj do obejrzanych</button>
            </div>

      </div>
  )
}
