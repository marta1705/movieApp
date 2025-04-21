import React, {useContext, useEffect, useState} from 'react'
import { GlobalContext } from '../Context/GlobalState';
import { Rating, Stack, Typography } from "@mui/material";
import ContentModal from './ContentModal';
import KontrolkiFilm from './KontrolkiFilm';
import StarIcon from '@mui/icons-material/Star';


export const KartaFilmBiblioteka = ({movie, type}) => {

  const [value, setValue] = useState(0);
  const {
    addRating, ratings, updateRating
  } = useContext(GlobalContext);

  useEffect(() => {
    let rating = ratings.find(o => o.id === movie.id);
    rating ? setValue(rating.rating) : setValue(0);
  }, [ratings, movie.id])


  return (
    <div className='karta-film-bib'>

            <ContentModal id={movie.id}>
            {movie.poster_path ? (
            <img className="poster" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`${movie.title} Poster`} />
            ) : (
            <img className='poster' src="https://www.movienewz.com/img/films/poster-holder.jpg" alt='Poster unavailable'/>
            )}
            </ContentModal>

            <b className='title'>{movie.title}</b>
            <div className='vote_date_div'>
              <Stack alignItems="center" direction="row" gap={1}>
                <StarIcon />
                <Typography fontFamily="Playfair Display" variant='body1'>{movie.vote_average}</Typography>
              </Stack>
              <span className='subTitle'>
                  {movie.release_date.substring(0,4)}
              </span>
            </div>
            {/* <span className='subTitle'>
                {movie.release_date.substring(0,4)}
            </span> */}

            <KontrolkiFilm type={type} movie={movie} />

            {type === "watched" && (
            <div className='rating-stars'>
                <Rating name='half-rating' emptyIcon={<StarIcon style={{color:"gray"}} />} value={value} defaultValue={0} precision={0.5} onChange={(event, newValue) => {
                    if (ratings.find(item => item.id === movie.id)) {
                        updateRating(newValue, movie.id);
                    } else {
                        addRating(newValue, movie.id);
                    }
                }}
                />
            </div>
            )}
      </div>
  )
}
