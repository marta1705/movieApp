import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id}) => { 
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
        <div className='carouselItem'>
            <img src={c.profile_path ? `https://image.tmdb.org/t/p/w300/${c.profile_path}` : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"}
            alt={c?.name}
            onDragStart={handleDragStart}
            className='carouselItem_img' />
            <b className='carouselItem_txt'>{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setCredits(data.cast))

  }, [id]);

    return<AliceCarousel autoPlay responsive={responsive} infinite disableDotsControls disableButtonsControls mouseTracking items={items} />;
};
export default Carousel;