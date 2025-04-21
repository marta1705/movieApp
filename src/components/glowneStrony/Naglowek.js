// to jest naglowek, tylko do przeskakiwania miedzy stronami
import React from 'react'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

export const Naglowek = () => {
  return (
    <header>
        <div className='header_container'>
            <div className='inner_container'>
                <div className='page_name'>
                    <Link to="/">Kinomaniak</Link>
                </div>
                
                <ul className='pages_links'>
                    <li>
                        <Link to="/">Strona Główna</Link>
                    </li>
                    <li>
                        <Link to="/biblioteka">Biblioteka</Link>
                    </li>
                    <li>
                        <Link to="/szukaj">Szukaj <SearchIcon style={{color:'white', fontSize: '25px' }} /></Link>
                    </li>

                </ul>
            </div>
        </div>
    </header>
  );
};

