import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Carousel from "./Carousel";
import './ContentModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: '#74455b',
  border: '1px solid #282c34',
  boxShadow: 24,
  p: 4,
  color: 'white',
  borderRadius: 10
};

export default function ContentModal( {children, id} ) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
    .then((res) => res.json())
    .then((data) => { 
      setMovie(data);
      setGenres(data.genres);
  })
}, [id]);


  return (
    <>
      <div className="media_two" onClick={handleOpen}>
        {children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        {movie && (<Box sx={style}>
            <div className='ContentModal'>

                <img alt={movie.title} className='Content_portrait' src={movie.poster_path? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://www.movienewz.com/img/films/poster-holder.jpg"} />
                <img alt={movie.title} className='Content_landscape' src={movie.poster_path? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"} />
                <div className='ContentModal_about'>
                    <span className='ContentModal_title'>
                        {movie.title} (
                            {(
                                movie.release_date ||
                                "-----"
                            ).substring(0,4)}
                        )
                    </span>

                    {/* {movie.tagline && (
                        <i className='tagline'>{movie.tagline}</i>
                    )} */}

                    <div style={{whiteSpace: 'nowrap', textAlign: 'center', marginTop: '10px'}}>
                      {genres && (
                            genres.map((genre, index) => 
                            <span className='tagline' key={index}>
                              {genre.name}
                              {index !== genres.length - 1 && ', '}
                            </span>)
                      )}
                    </div>

                    <span className='span_description'><b>Description</b></span>
                    <div className='ContentModal_description'>
                        {movie.overview}
                    </div>
                    <div>
                        <Carousel id={id}/>
                    </div>

                </div>
            </div>
        </Box>)}
        </Fade>
      </Modal>
    </>
  );
}