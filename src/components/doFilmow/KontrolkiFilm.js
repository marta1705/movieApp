import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState'

const KontrolkiFilm = ({movie, type}) => {
    const {removeMovieFromWatchlist, addMovieToWatched, moveToWatchlist, removeFromWatched} = useContext(GlobalContext);
  return (
    <div className='kontrolki_div'>
        {type === "watchlist" && (
            <>
                <div className='tooltip_ikonka'>
                    <div className='tooltip'>Przenieś do obejrzanych</div>
                    <button className='kontrolki-btn' onClick={() => addMovieToWatched(movie)}>
                        <span><i className='fa-fw far fa-eye'></i></span>
                    </button>
                </div>

                <div className='tooltip_ikonka'>
                    <div className='tooltip'>Usuń z listy</div>
                    <button className='kontrolki-btn' onClick={() => removeMovieFromWatchlist(movie.id)}>
                        <span><i className='fa-fw fa fa-times'></i></span>
                    </button>
                </div>

            </>
        )}

        {type === "watched" && (
            <>
                <div className='tooltip_ikonka'>
                    <div className='tooltip'>Przenieś do obejrzenia</div>
                    <button className='kontrolki-btn' onClick={() => moveToWatchlist(movie)}>
                        <span><i className='fa-fw far fa-eye-slash'></i></span>
                    </button>
                </div>

                <div className='tooltip_ikonka'>
                    <div className='tooltip'>Usuń z listy</div>
                    <button className='kontrolki-btn' onClick={() => removeFromWatched(movie.id)}>
                        <span><i className='fa-fw fa fa-times'></i></span>
                    </button>
                </div>
            </>
        )}
    </div>
  )
}

export default KontrolkiFilm
